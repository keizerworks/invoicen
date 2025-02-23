import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import path from "path";
import dotenv from "dotenv";

dotenv.config();

const s3 = new S3Client({
  region: process.env.AWS_REGION || "us-east-1",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
});

const bucketName = process.env.S3_BUCKET_NAME!;

export async function uploadFileToS3(fileBuffer: Buffer, originalFileName: string, mimeType: string) {
  const fileExtension = path.extname(originalFileName);
  const key = `onboarding/${Date.now()}-${path.basename(originalFileName, fileExtension)}${fileExtension}`;

  const uploadCommand = new PutObjectCommand({
    Bucket: bucketName,
    Key: key,
    Body: fileBuffer,
    ContentType: mimeType,
  });

  await s3.send(uploadCommand);

  return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
}
