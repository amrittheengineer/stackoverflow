const express = require("express");

const setup = require("../../../setup/myurl");
var NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const router = express.Router();

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

router.get("/api/test", (req, res) => {
  res.sendFile("index.html");
});
module.exports = router;
