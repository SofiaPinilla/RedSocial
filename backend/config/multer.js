const Multer = require('multer');
const mimetypes = ['image/png', 'image/jpg', 'image/jpeg'];
const uploadPublicationsImages = Multer({
    storage: Multer.diskStorage({
        destination: (req, file, callback) => {
            callback(null, './public/images/publications');
        },
        filename: (req, file, callback) => {
            callback(null, Date.now() + '-' + file.originalname);
        },
    }),
    fileFilter: (req, file, callback) => {

        if (mimetypes.includes(file.mimetype)) {
            callback(null, true)
        } else {
            callback(null, false)
        }
    },
    limits: { fileSize: 2 * 1024 * 1024 }
});
module.exports = { uploadPublicationsImages };