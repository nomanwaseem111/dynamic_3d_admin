import { DynamoDBClient, UpdateItemCommand } from "@aws-sdk/client-dynamodb";
import { buildResponse } from "../../utils/helperFunction/buildResponse.js";

const dynamoDBClient = new DynamoDBClient({ region: "us-east-1" });
const ProductsTable = process.env.PRODUCT_TABLE;

export const handler = async (event) => {
    console.log("Update Product Event:", event);

    try {
        const productId = event.pathParameters?.productId;
        if (!productId) {
            return buildResponse(400, { error: "Product ID is required" });
        }

        const requestBody = JSON.parse(event.body || "{}");

        // ✅ Full list of fields to allow updating
        const allowedFields = [
            "productName",
            "sku",
            "description",
            "brand",
            "productType",
            "defaultPrice",
            "visibility",
            "categories",
            "weight",
            "images",
            "createdAt",
            "updatedAt"
        ];

        const updateExpressions = [];
        const expressionAttributeValues = {};
        const expressionAttributeNames = {};

        for (const key of allowedFields) {
            if (key in requestBody) {
                updateExpressions.push(`#${key} = :${key}`);
                const value = requestBody[key];

                if (typeof value === "boolean") {
                    expressionAttributeValues[`:${key}`] = { BOOL: value };
                } else if (typeof value === "number") {
                    expressionAttributeValues[`:${key}`] = { N: value.toString() };
                } else if (typeof value === "object") {
                    expressionAttributeValues[`:${key}`] = { S: JSON.stringify(value) };
                } else {
                    expressionAttributeValues[`:${key}`] = { S: value };
                }

                expressionAttributeNames[`#${key}`] = key;
            }
        }

        if (updateExpressions.length === 0) {
            return buildResponse(400, { error: "No valid fields to update" });
        }

        const updateParams = {
            TableName: ProductsTable,
            Key: {
                productId: { S: productId },
            },
            UpdateExpression: "SET " + updateExpressions.join(", "),
            ExpressionAttributeValues: expressionAttributeValues,
            ExpressionAttributeNames: expressionAttributeNames,
            ReturnValues: "ALL_NEW",
        };

        const result = await dynamoDBClient.send(new UpdateItemCommand(updateParams));

        return buildResponse(200, {
            message: "Product updated successfully",
            updatedProduct: result.Attributes,
        });
    } catch (err) {
        console.error("Update product error:", err);
        return buildResponse(500, { error: "Internal Server Error: " + err.message });
    }
};
