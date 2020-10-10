const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploader");
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const config = require('config');

const mongoURI = config.get('mongoURI');

const routes = app => {
  const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  let gfs;
  conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('image_uploads');
  });

  router.post("/api/upload", uploadController.uploadFiles);

  router.get("/api/getFigs", (req, res) => {
    gfs.files.find().toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({err: 'No files exist'});
      }
      const streamedImages = [];
      files.forEach(file => {
        const readStream = gfs.createReadStream({ filename: file.filename });
        let data = '';
        readStream.on('data', (chunk) => {
            data += chunk.toString('base64');
        });
        readStream.on('end', () => {
          streamedImages.push({[file.filename]: data});
        });
      });
      if (streamedImages.length === files.length) {
        return res.send(streamedImages);
      } else {
        setTimeout(() => {
          return res.send(streamedImages);
        }, 10000);
      }
    });
  });

  return app.use("/", router);
};

module.exports = routes;