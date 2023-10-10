
const multer = require('multer');
const appError = require('../utils/appError');

const diskStorage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        const extention = file.mimetype.split('/')[1];
        const filename = `user_${Date.now()}.${extention}`
        cb(null, filename)
    }
})
const fileFilter = (req, file, cb) => {
    const fileType = file.mimetype.split('/')[0];
    if (fileType == "image") {
        cb(null, true)
    } else {
        return cb(appError.create("this file type is not supported, the file must be an image", 400), false)
    }
}
const upload = multer({ storage: diskStorage, fileFilter })

module.exports = upload;