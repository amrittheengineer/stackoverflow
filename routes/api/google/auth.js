const express = require("express");
const router = express.Router();
const setup = require("../../../setup/myurl");
const path = require("path");
var axios = require("axios");

router.post("/api", (req, res) => {
  let query = req.body.query;
  // console.log(req.body);

  while (String(query).indexOf(" ") != -1) {
    query = query.replace(" ", "+");
  }
  axios
    .get(
      `https://www.googleapis.com/customsearch/v1?key=${
        setup.google.apiKey
      }&cx=${setup.google.cx}&q=${query}`
    )
    .then(axiosRes => {
      let data = axiosRes.data;
      let links = data.items.map(item => item.link);
      res.json({ ...links });
    })
    .catch(err => {
      console.log(err);
    });
  console.log(query);
});

router.get("/api/test", (req, res) => {
  res.sendFile("google.html", {
    root: path.join(__dirname, "../../../public")
  });
});
module.exports = router;
