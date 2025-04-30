import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";

const s3 = new S3Client({ region: "us-east-1" });
const S3BucketName = process.env.S3_BUCKET_NAME;

export const getS3Object = async (Key) => {
  try {
    // Log the type and value of Key
    console.log("Type of Key:", typeof Key);
    console.log("Value of Key:", Key);
    
    // Ensure Key is a valid string
    if (typeof Key !== "string" || !Key.trim()) {
      console.error("Invalid Key:", Key);
      throw new Error("Invalid Key: Key must be a non-empty string.");
    }

    const getObjectParams = {
      Bucket: S3BucketName,
      Key: Key,
    };

    console.log("getObjectParams:", getObjectParams);

    // Generate the signed URL
    const command = new GetObjectCommand(getObjectParams);
    console.log("Sending GetObjectCommand...");
    const url = await getSignedUrl(s3, command, { expiresIn: 36000 });

    console.log("Generated URL:", url);
    return { url };
  } catch (error) {
    console.error("Error:", error);

    // Handle specific error cases
    if (error.name === 'NoSuchKey') {
      console.error("The specified key does not exist.");
    } else if (error.name === 'InvalidBucketName') {
      console.error("The specified bucket name is invalid.");
    } else {
      console.error("An unexpected error occurred:", error);
    }
    return false;
  }
};