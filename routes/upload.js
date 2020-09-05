const express = require('express');
// const path = require('path');
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
    gfs.collection('image_uploads');
    console.log(gfs, 'inside/////////////////////////////')
  });
console.log(gfs, 'outside**************************');

// Create storage engine
const storage = new GridFsStorage({
    url: mongoURI,
    options: {useUnifiedTopology: true},
    file: (req, file) => {
      return new Promise((resolve, reject) => {
        crypto.randomBytes(16, (err, buf) => {
          if (err) {
            console.log(buf.toString('hex'), err);
            return reject(err);
          }
          const fileInfo = {
            filename: file.originalname,
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
router.post('/', upload.array('file', 12), (req, res) => {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({msg: 'Please Include atleast 1 file to upload'});
    }
    req.files.forEach(file =>
      gfs.find().toArray((err, files) => {
        if (files && files.filter(item => item.filename === file.name).length > 0) {
          return res.status(400).json({msg: 'Please rename the image as there is a matching name in database'});
        }
      }) 
    );
    return res.json({msg: 'Files uploaded successfully!'});
});

module.exports = router;
