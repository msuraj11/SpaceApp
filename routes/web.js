const express = require("express");
const router = express.Router();
const uploadController = require("../controllers/uploader");
const mongoose = require('mongoose');
const Grid = require('gridfs-stream');
const config = require('config');

const mongoURI = config.get('mongoURI');

// function getStreamConnection() {
//   const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true });
//   let gfs;
//   conn.once('open', () => {
//     gfs = Grid(conn.db, mongoose.mongo);
//     gfs.collection('image_uploads');
//   });
//   return gfs;
// }

const routes = app => {
  const conn = mongoose.createConnection(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  let gfs;
  conn.once('open', () => {
    gfs = Grid(conn.db, mongoose.mongo);
    gfs.collection('image_uploads');
  });

  router.post("/api/upload", uploadController.uploadFiles);

  router.get("/api/getFigs", (req, res) => {
    // const gfs = getStreamConnection();
    gfs.files.find().toArray((err, files) => {
      if (!files || files.length === 0) {
        return res.status(404).json({err: 'No files exist'});
      }
      const streamedImages = [];
      files.forEach(file => {
        const readStream = gfs.createReadStream({ filename: file.filename });
        //readStream.pipe(res);
        let data = '';
        readStream.on('data', (chunk) => {
            data += chunk.toString('base64');
            console.log(data);
            streamedImages.push(btoa(data));
        })
        readStream.on('end', () => {
          console.log(data, 'on-end ////////////////////////////');  //res.send(data) without pushing in array works
        })
      });
      console.log(streamedImages);
      return res.send(streamedImages);
    });
  });

  return app.use("/", router);
};

module.exports = routes;