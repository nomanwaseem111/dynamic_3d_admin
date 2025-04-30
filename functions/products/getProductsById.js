import { DynamoDBClient, GetItemCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { buildResponse } from "../../utils/helperFunction/buildResponse.js";

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
const s3Client = new S3Client({ region: "us-east-1" });

const ProductsTable = process.env.PRODUCT_TABLE;
const S3BucketName = process.env.PRODUCT_BUCKET_NAME;

export const handler = async (event) => {
    console.log("event.....", event);
    try {
        const productId = event.pathParameters.productId;

        const params = {
            TableName: ProductsTable,
            Key: {
                productId: { S: productId },
            },
        };

        const command = new GetItemCommand(params);
        const result = await dynamoDBClient.send(command);

        if (!result.Item) {
            return buildResponse(404, { message: "Product not found" });
        }

        const product = unmarshall(result.Item);

        // Generate image URLs from S3
        if (product.images && Array.isArray(product.images)) {
            product.images = await Promise.all(
                product.images.map(async (image) => {
                    if (!image.imageKey) {
                        throw new Error(`Image key is missing for image: ${image.imageName}`);
                    }

                    const imageUrl = await getSignedUrl(
                        s3Client,
                        new GetObjectCommand({
                            Bucket: S3BucketName, // Make sure it's correctly passed
                            Key: image.imageKey,
                        }),
                        { expiresIn: 300 }
                    );

                    return {
                        imageName: image.imageName,
                        imageKey: image.imageKey,
                        imageUrl,
                    };
                })
            );
        }

        return buildResponse(200, product);
    } catch (err) {
        console.error("Error fetching product by ID:", err);
        return buildResponse(500, { error: "Internal Server Error: " + err.message });
    }
};


