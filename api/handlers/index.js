const path = require("path"),
  fs = require("fs"),
  mime = require("mime-types"),
  rangeParser = require("range-parser");

const logAndError = (err, res) => {
  console.log(err);
  res.status(500).send({ error: "Internal server error!" });
};

const getFilePath = (fileName) => {
  try {
    const folderPath = path.join(__dirname, "../../uploads"),
      files = fs.readdirSync(folderPath),
      fileRegex = new RegExp(`^${fileName}.*$`),
      fileMatch = files.find((file) => fileRegex.test(file)),
      filePath = path.join(folderPath, fileMatch);
    return filePath;
  } catch (err) {
    console.log(err);
    return null;
  }
};

class Handler {
  static async home(req, res) {
    res.status(200).send("Hi there.");
  }
  static async uploadFile(req, res) {
    try {
      if (req.file) {
        res.status(200).send({ fileId: req.fileId });
      } else {
        res.status(400).send({ error: "A proper file not provided with." });
      }
    } catch (err) {
      logAndError(err, res);
    }
  }
  static async downloadFile(req, res) {
    try {
      const fileName = req.params.fileId,
        filePath = getFilePath(fileName);

      if (filePath && fs.existsSync(filePath)) {
        const fileStream = fs.createReadStream(filePath),
          mimetype = mime.lookup(filePath);

        res.setHeader("Content-Type", mimetype);
        res.setHeader(
          "Content-Disposition",
          `attachment; filename=${fileName}`
        );
        fileStream.pipe(res);
      } else {
        res.status(404).send({ error: "File not found." });
      }
    } catch (err) {
      logAndError(err, res);
    }
  }
}

module.exports = Handler;
