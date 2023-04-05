const multer = require("multer");

var Storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './images')
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname)
    }
})
var upload = multer({
    storage: Storage
}).single('file')
module.exports = upload;