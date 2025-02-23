import multer from "multer";

const storage = multer.memoryStorage();

export const fileUpload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB file size limit
  },
});
