const express = require("express");
const router = express.Router();
const setup = require("../../../setup/myurl");
const path = require("path");
var axios = require("axios");
const url = "https://api.stackexchange.com/2.2";

router.get("/api/answers/:answerID", (req, res) => {
  if (req.params.answerID) {
    let data1 = axiosRes1.data;
    let answerIDs = data1.items.map(item => item.answer_id);
    console.log(answerIDs);
    answerIDs.forEach(answerID => {
      // Getting Comments
      axios
        .get(
          `${url}/answers/${answerID}/comments?order=desc&sort=votes&site=stackoverflow`
        )
        .then(axiosRes2 => {
          let data2 = axiosRes2.data;
          let commentIDs = data2.items.map(item => item.comment_id); // comment_id
          console.log(commentIDs);
        })
        .catch(err => console.log(err.message));
    });
  }
});

router.get("/api/:questionID", (req, res) => {
  let questionID = req.params.questionID;
  console.log(questionID);
  // res.send("Got " + questionID);

  // GET Answers for the question ID.
  axios
    .get(
      `${url}/questions/${questionID}/answers?order=desc&sort=activity&site=stackoverflow`
      // Add &filter=withbody to get the answer too.
    )
    .then(axiosRes1 => {
      let data1 = axiosRes1.data;
      let answerIDs = data1.items.map(item => item.answer_id);
      console.log(answerIDs);
      answerIDs.forEach(answerID => {
        // Getting Comments
        // Left here on 19-07-2019

        axios
          .get(
            `${url}/answers/${answerID}/comments?order=desc&sort=votes&site=stackoverflow`
          )
          .then(axiosRes2 => {
            let data2 = axiosRes2.data;
            let commentIDs = data2.items.map(item => item.comment_id); // comment_id
            console.log(commentIDs);
          })
          .catch(err => console.log(err.message));
      });

      // res.json({ ...answers });
    })
    .catch(err => console.log(err));
});

router.get("/api/test", (req, res) => {
  res.sendFile("stackoverflow.html", {
    root: path.join(__dirname, "../../../public")
  });
});
module.exports = router;
