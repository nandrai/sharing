const path = require("path"),
  express = require("express"),
  router = express.Router(),
  Handler = require("../handlers/"),
  upload = require("../../logic/upload/");

router.use(express.static(path.join(__dirname, "../../app/dist/")));

router.post("/api/upload", upload.single("file"), Handler.uploadFile);
router.get("/api/download/:fileId", Handler.downloadFile);
router.get("/", async (_, res) => {
  res.sendFile(path.join(__dirname, "../../app/dist/index.html"), (err) => {
    if (err) {
      res.status(500).send({ error: err });
    }
  });
});
router.use("*", async (req, res) =>
  res.status(404).send({ error: "Page not found." })
);

module.exports = router;
