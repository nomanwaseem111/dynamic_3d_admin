import { DynamoDBClient, ScanCommand } from "@aws-sdk/client-dynamodb";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import { buildResponse } from "../../utils/helperFunction/buildResponse.js";

const dynamoDB = new DynamoDBClient({ region: "us-east-1" });
const s3Client = new S3Client({ region: "us-east-1" });

const ProductsTable = process.env.PRODUCT_TABLE;
const S3BucketName = process.env.PRODUCT_BUCKET_NAME;

export const handler = async (event) => {
    console.log("event........", event);

    const scanParams = {
        TableName: ProductsTable,
        Limit: 10,
    };

    if (event.queryStringParameters && event.queryStringParameters.nextToken) {
        scanParams.ExclusiveStartKey = JSON.parse(
            decodeURIComponent(event.queryStringParameters.nextToken)
        );
    }

    try {
        const data = await dynamoDB.send(new ScanCommand(scanParams));
        console.log("data........", data);

        if (!data.Items || data.Items.length === 0) {
            return buildResponse(404, { error: "No products found" });
        }

        const unmarshalledProducts = data.Items.map((item) => unmarshall(item));

        const productsWithImages = await Promise.all(
            unmarshalledProducts.map(async (product) => {
              if (product.images && Array.isArray(product.images) && product.images.length > 0) {
                product.images = await Promise.all(
                  product.images.map(async (image) => {
                    if (!image.imageKey) {
                      throw new Error(`Image key missing for image: ${image.imageName || "Unnamed Image"}`);
                    }
          
                    const imageUrl = await getSignedUrl(
                      s3Client,
                      new GetObjectCommand({
                        Bucket: S3BucketName,
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
              } else {
                // Images array nahi hai to empty set kar do
                product.images = [];
              }
              return product;
            })
          );
          

        const response = {
            products: productsWithImages,
            nextToken: data.LastEvaluatedKey
                ? encodeURIComponent(JSON.stringify(data.LastEvaluatedKey))
                : null,
        };

        return buildResponse(200, response);
    } catch (err) {
        console.error("Error retrieving products:", err);
        return buildResponse(500, { error: "Internal Server Error" });
    }
};
