import multer from 'multer';

const fileUpload = multer({ dest: 'uploads/' });

export default fileUpload;
