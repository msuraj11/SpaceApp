const util = require("util");
const multer = require("multer");
const GridFsStorage = require("multer-gridfs-storage");
const config = require('config');

const storage = new GridFsStorage({
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

const uploadFile = multer({ storage: storage }).array('file', 12);
const uploadFilesMiddleware = util.promisify(uploadFile);
module.exports = uploadFilesMiddleware;
