const express = require('express');
const path = require('path');
const crypto = require('crypto');
const mongoose = require('mongoose');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const config = require('config');

const router = express.Router();

const mongoURI = config.get('mongoURI');
const conn = mongoose.createConnection(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

//init gfs
let gfs;
conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('image_uploads')
  });

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    options: {useUnifiedTopology: true},
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            return reject(err);
          }
          const filename = buf.toString('hex') + path.extname(file.originalname);
          const fileInfo = {
            filename: filename,
            bucketName: 'image_uploads'
          };
          resolve(fileInfo);
        });
      });
    }
  });

const upload = multer({ storage });

// @route   POST api/upload
// @desc    Upload an image
// @access  Public
router.post('/', upload.single('file'), (req, res) => {
  console.log(req)
    res.json({file: req.file});
});

module.exports = router;
