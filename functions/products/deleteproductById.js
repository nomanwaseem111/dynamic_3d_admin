import { DynamoDBClient, GetItemCommand, DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, DeleteObjectCommand } from "@aws-sdk/client-s3";
import { buildResponse } from "../../utils/helperFunction/buildResponse.js";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const s3Client = new S3Client({ region: "us-east-1" });

const ProductsTable = process.env.PRODUCT_TABLE;
const ProductBucket = process.env.PRODUCT_BUCKET_NAME;

export const handler = async (event) => {
    console.log("Event:", JSON.stringify(event));

    const productId = event?.pathParameters?.id;

    if (!productId) {
        return buildResponse(400, { error: "Product ID is required" });
    }

    try {
        // Step 1: Get the product to find image key
        const getProductParams = {
            TableName: ProductsTable,
            Key: {
                productId: { S: productId },
            },
        };

        const productData = await dynamoDB.send(new GetItemCommand(getProductParams));

        if (!productData.Item) {
            return buildResponse(404, { error: "Product not found" });
        }

        const imageKey = productData.Item.image?.S;

        // Step 2 & 3: Delete from DynamoDB and S3 (parallel)
        const deleteProductPromise = dynamoDB.send(
            new DeleteItemCommand({
                TableName: ProductsTable,
                Key: {
                    productId: { S: productId },
                },
            })
        );

        const deleteImagePromise = imageKey
            ? s3Client.send(
                  new DeleteObjectCommand({
                      Bucket: ProductBucket,
                      Key: imageKey,
                  })
              )
            : Promise.resolve(); 

        await Promise.all([deleteProductPromise, deleteImagePromise]);

        return buildResponse(200, { message: "Product and image deleted successfully" });
    } catch (err) {
        console.error("Delete error:", err);
        return buildResponse(500, { error: "Failed to delete product and image" });
    }
};
