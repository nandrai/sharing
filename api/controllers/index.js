const path = require("path");
const express = require("express");
const router = express.Router(),
  Handler = require("../handlers/"),
  upload = require("../../logic/upload/");

router.use(express.static(path.join(__dirname, "../../app/dist/")));

router.post("/api/upload", upload.single("file"), Handler.uploadFile);
router.get("/api/download/:fileId", Handler.downloadFile);
router.get("*", function (_, res) {
  res.sendFile(path.join(__dirname, "../../app/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send(err);
    }
  });
});

module.exports = router;
