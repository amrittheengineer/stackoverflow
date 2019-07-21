const express = require("express");
const router = express.Router();
var qs = require("querystring");

const path = require("path");
var axios = require("axios");

//@type     GET
//@route    /query/api
//@desc     REST API to get the stackoverflow similar questions in sorted order from text-similarity server
//@access   PUBLIC
router.post("/api", (req, res) => {
  let query = req.body.query;
  var finalLinks = [];
  axios
    .get(
      `https://api.stackexchange.com/2.2/search?order=desc&sort=activity&intitle=${query}&site=stackoverflow`
    )
    .then(axiosRes1 => {
      let data = axiosRes1.data;
      let links = data.items.map(item => item.link);
      var titles = data.items.map(item => item.title);
      var apiPromises = links.map((link, ind) => {
        console.log(decodeURI(titles[ind]));
        return axios
          .request({
            url: "/similarity",
            method: "post",
            data: qs.stringify({
              text1: query,
              text2: decodeURI(titles[ind])
            }),
            baseURL: "http://localhost:3000",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded"
            }
          })
          .then(axiosRes2 => {
            console.log(axiosRes2.data);
            finalLinks.push({
              similarity: Number(axiosRes2.data.similarity),
              link: link
            });
          })
          .catch(err => console.log(err.message));
      });
      Promise.all(apiPromises)
        .then(() => {
          finalLinks = finalLinks.sort(
            (a, b) => Number(b.similarity) - Number(a.similarity)
          );
          finalLinks = finalLinks.map(l => l.link);
          console.log(finalLinks);
          res.json(finalLinks);
        })
        .catch(err => console.log(err));
    })
    .catch(err => {
      console.log(err);
    });
  console.log(query);
});

//@type     GET
//@route    /query/api/test
//@desc     To test the route /query/api
//@access   PUBLIC
router.get("/api/test", (req, res) => {
  res.sendFile("query.html", {
    root: path.join(__dirname, "../../../public")
  });
});
module.exports = router;
