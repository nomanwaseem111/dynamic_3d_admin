import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { DynamoDBClient, PutItemCommand } from "@aws-sdk/client-dynamodb";
import { marshall } from "@aws-sdk/util-dynamodb";
import { v4 as uuidv4 } from "uuid";
import { buildResponse } from "../../utils/helperFunction/buildResponse.js";
import { productBodyValidate } from "../../utils/bodyValidator/product.js";
import { stroeFrontBodyValidate } from "../../utils/bodyValidator/storefront.js";
import { authorizeAdmin } from "../../utils/cognito/authorize.js";

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
const s3Client = new S3Client({ region: "us-east-1" });

const ProductsTable = process.env.PRODUCT_TABLE;
const S3BucketName = process.env.PRODUCT_BUCKET_NAME;

export const handler = async (event) => {
    console.log("event........", event);

    const authResponse = authorizeAdmin(event);
    if (!authResponse.isAuthorized) {
        return authResponse;
    }

    try {
        if (!S3BucketName || !ProductsTable) {
            throw new Error("Missing environment variables (S3_BUCKET_NAME/PRODUCT_TABLE)");
        }

        const productId = uuidv4(); // Unique ID for the product (primary key)
        const storefrontId = uuidv4(); // Unique ID for the storefront (sort key)
        const requestBody = JSON.parse(event.body);

        // Product data
        const productData = {
            productName: requestBody.productName,
            sku: requestBody.sku,
            productType: requestBody.productType,
            brand: requestBody.brand,
            defaultPrice: requestBody.defaultPrice,
            weight: requestBody.weight,
            categories: requestBody.categories,
            description: requestBody.description,
            visibility: requestBody.visibility !== undefined ? requestBody.visibility : true,
            images: requestBody.images,
        };

        // Storefront data
        const storefrontData = {
            searchKeyword: requestBody.searchKeyword,
            availabilityTest: requestBody.availabilityTest,
            sortOrder: requestBody.sortOrder,
            templateLayout: requestBody.templateLayout,
            condition: requestBody.condition,
            warrantyInformation: requestBody.warrantyInformation,
        };

        // Validate product data
        const { error: productError, value: validatedProductData } = productBodyValidate(productData);
        if (productError) {
            return buildResponse(422, { error: productError.details.map((detail) => detail.message) });
        }

        // Validate storefront data
        const { error: storefrontError, value: validatedStorefrontData } = stroeFrontBodyValidate(storefrontData);
        if (storefrontError) {
            return buildResponse(422, { error: storefrontError.details.map((detail) => detail.message) });
        }

        // Upload images to S3 and generate signed URLs
        const presignedUrls = await Promise.all(
            validatedProductData.images.map(async (imageName) => {
                const putObjectCommand = new PutObjectCommand({
                    Bucket: S3BucketName.trim(),
                    Key: `products/${productId}/${imageName}`,
                    ContentType: "image/*",
                });
                return getSignedUrl(s3Client, putObjectCommand, { expiresIn: 300 });
            })
        );

        // Combine product and storefront data into a single item
        const combinedData = {
            productId, // Primary key
            storefrontId, // Sort key
            ...validatedProductData,
            ...validatedStorefrontData,
            images: validatedProductData.images.map((name) => ({
                imageKey: `products/${productId}/${name}`,
                imageName: name,
            })),
            updatedAt: new Date().toISOString(),
            createdAt: new Date().toISOString(),
        };

        // Save the combined data to the ProductsTable
        await dynamoDBClient.send(
            new PutItemCommand({
                TableName: ProductsTable,
                Item: marshall(combinedData),
            })
        );

        // Return the combined data along with presigned URLs
        return buildResponse(201, { ...combinedData, presignedUrls });
    } catch (err) {
        console.error("Error creating product:", err);
        return buildResponse(500, { error: "Internal Server Error: " + err.message });
    }
};