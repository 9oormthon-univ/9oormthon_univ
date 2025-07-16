import { useState } from 'react';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
// S3 업로드를 위한 커스텀 훅
export function useS3Upload() {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // AWS S3 설정
  const region = import.meta.env.VITE_REGION;
  const accessKeyId = import.meta.env.VITE_AWS_ACCESS_KEY_ID;
  const secretAccessKey = import.meta.env.VITE_AWS_SECRET_ACCESS_KEY;
  const bucketName = import.meta.env.VITE_BUCKET_NAME;

  // S3 클라이언트 생성
  const s3Client = new S3Client({
    region: region,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey,
    },
  });

  // 이미지 업로드 함수
  const uploadToS3 = async (imageFile: File): Promise<string | null> => {
    setUploading(true);
    setError(null);

    try {
      const fileName = `uploads/${Date.now()}_${imageFile.name}`;

      const fileBlob = await imageFile.arrayBuffer();

      const uploadParams = {
        Bucket: bucketName,
        Key: fileName,
        Body: new Uint8Array(fileBlob),
        ContentType: imageFile.type,
      };

      await s3Client.send(new PutObjectCommand(uploadParams));

      const uploadedUrl = `https://${bucketName}.s3.${region}.amazonaws.com/${fileName}`;
      return uploadedUrl;
    } catch {
      setError('이미지 업로드 실패');
      return null;
    } finally {
      setUploading(false);
    }
  };

  return { uploadToS3, uploading, error };
}
