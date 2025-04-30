import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3"
const s3 = new S3Client({ region: "us-east-1" })

const S3BucketName = process.env.S3_BUCKET_NAME;

export const getResumeSignedUrl = async (productId, fileName, type) => {
    try {

        if (type !== "jpeg") {
            return buildResponse(500, { message: "File must be jpeg, png." })
        }

        const contentType = "image/jpeg";

        const Key = `product/${productId}/${fileName}.${type}`
        const putObjectParams = {
            Bucket: S3BucketName,
            Key,
            ContentType: contentType,
        }

        const command = new PutObjectCommand(putObjectParams)
        const url = await getSignedUrl(s3, command, { expiresIn: 300 })
        return url
    } catch (error) {
        console.error('Error:', error);
        return false
    }
};