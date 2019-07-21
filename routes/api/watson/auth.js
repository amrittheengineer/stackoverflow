const express = require("express");
const path = require("path");

const setup = require("../../../setup/myurl");
var NaturalLanguageUnderstandingV1 = require("ibm-watson/natural-language-understanding/v1");
const router = express.Router();

//@type     GET
//@route    /watson/api
//@desc     REST API to analyse the comment using Sentimental Analysis.
//@access   PUBLIC
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

//@type     GET
//@route    /watson/api/test
//@desc     Route to test /watson/api.
//@access   PUBLIC
router.get("/api/test", (req, res) => {
  res.sendFile("watson.html", {
    root: path.join(__dirname, "../../../public")
  });
});
module.exports = router;
