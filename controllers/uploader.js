const upload = require("../middleware/upload");

const uploadFiles = async (req, res) => {
  try {
    await upload(req, res);
    console.log(req.files);

    if (req.files.length <= 0) {
      return res.status(400).json({error: `You must select at least 1 file.`});
    }

    return res.json({msg: 'Files uploaded successfully!'});
  } catch (error) {
    console.log(error);

    if (error.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({error: `Too many files to upload.!`});
    }
    return res.status(500).json({error: `Error when trying upload many files: ${error}`});
  }
};

module.exports = {
  uploadFiles
};
