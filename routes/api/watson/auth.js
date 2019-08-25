const express = require("express");
const path = require("path");

const setup = require("../../../setup/myurl");
var NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const router = express.Router();
var VisualRecognitionV3 = require("ibm-watson/visual-recognition/v3");
// var fs = require("fs");
const fileUpload = require("express-fileupload");
router.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/images/"
  })
);

router.post("/api", (req, res) => {
  var nlu = new NaturalLanguageUnderstandingV1({
    iam_apikey: setup.watson.apiKey,
    version: "2018-04-05",
    url: setup.watson.url
  });

  nlu
    .analyze({
      text: String(req.body.reply),
      language: "en",
      features: {
        concepts: {},
        keywords: {},
        sentiment: {}
      }
    })
    .then(result => {
      res.json(JSON.parse(JSON.stringify(result, null, 2)));
    })
    .catch(err => {
      res.send("TRY AGAIN");
    });
});
var count = 0;
router.post("/api/image", (req, res) => {
  var visualRecognition = new VisualRecognitionV3({
    url: "https://gateway.watsonplatform.net/visual-recognition/api",
    version: "2018-03-19",
    iam_apikey: "XvCQzlMh3sFOU3NMymRgcsmIhW0iIt6E68f6s9iMQl03"
  });
  let buf = Buffer.from(req.body.image, "base64");
  console.log("Request recieved " + count);

  visualRecognition
    .classify({
      images_file: buf
    })
    .then(result => {
      result = JSON.parse(JSON.stringify(result));
      result = result["images"][0]["classifiers"][0]["classes"].map(
        e => e.class
      );
      // console.log(result);
      res.json({ predictions: result });

      // console.log(JSON.stringify(result, null, 2));
      count++;

      // res.json();
    })
    .catch(err => {
      console.log(err);
    });
});

router.get("/api/test", (req, res) => {
  res.sendFile("watson.html", {
    root: path.join(__dirname, "../../../public")
  });
});
module.exports = router;
