const router = require("express").Router(),
  Handler = require("../handlers/"),
  upload = require("../../logic/upload/");

router.post("/api/upload", upload.single("file"), Handler.uploadFile);
router.get("/api/download/:fileId", Handler.downloadFile);
router.get("/", Handler.home);

module.exports = router;
