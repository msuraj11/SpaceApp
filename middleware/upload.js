const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const config = require('config');

var storage = new GridFsStorage({
  url: config.get('mongoURI'),
  options: { useNewUrlParser: true, useUnifiedTopology: true },
  file: (req, file) => {
    const match = ["image/png", "image/jpeg"];

    if (match.indexOf(file.mimetype) === -1) {
      return file.originalname;
    }

    return {
      bucketName: 'image_uploads',
      filename: file.originalname
    };
  }
});

var uploadFile = multer({ storage: storage }).array('file', 12);
var uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
