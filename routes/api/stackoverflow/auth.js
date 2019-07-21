const express = require("express");
const router = express.Router();
const stripTags = require("string-strip-html");
const path = require("path");
var axios = require("axios");
var qs = require("querystring");
const url = "https://api.stackexchange.com/2.2";

//Function that returns the average of the emotional score of answer
function replyAverage(lst) {
  if (lst.length) {
    let avg = lst.reduce((x, y) => Number(x) + Number(y), 0) / lst.length;
    // console.log(lst);
    // console.log(avg);
    return avg;
  } else {
    return 0;
  }
}

//@type     GET
//@route    /query/api/question/:questionID
//@desc     REST API to get the stackoverflow question's answers by questionID in sorted order by sentimental analysis of each comment.
//@access   PUBLIC
router.get("/api/question/:questionID", (req, res) => {
  let questionID = req.params.questionID.trim();
  console.log(questionID);
  // res.send("Got " + questionID);
  var orderInd = 0;
  // GET Answers for the question ID.
  axios
    .get(
      `${url}/questions/${questionID}/answers?order=desc&sort=activity&site=stackoverflow&filter=withbody`
      // Add &filter=withbody to get the answer too.
    )
    .then(axiosRes1 => {
      let data1 = axiosRes1.data;
      let answerIDs = data1.items.map(item => item.answer_id);
      let answerStrings = data1.items.map(item => item.body);
      // console.log(answerStrings);
      console.log(answerIDs);
      var ansObj = [];
      var apiPromises = answerIDs.map(answerID => {
        return axios
          .get(
            `${url}/answers/${answerID}/comments?order=desc&sort=votes&site=stackoverflow&filter=withbody`
          )
          .then((axiosRes2, ansInd) => {
            let data2 = axiosRes2.data;
            let commentIDs = data2.items.map(item => item.body); // comment_id
            var commentScoreArr = [];
            let replyPromises = commentIDs.map((comment, no) => {
              comment = decodeURI(stripTags(comment)).trim();
              return axios
                .request({
                  url: "/watson/api",
                  method: "post",
                  data: qs.stringify({
                    reply: comment
                  }),
                  baseURL: "http://localhost:5000",
                  headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                  }
                })
                .then(axiosRes3 => {
                  // console.log(`${no + 1})Comment`, comment);
                  let data3 = axiosRes3.data;
                  // commentScore.push(data3.sentiment.document.score);
                  // console.log(`\t${data3.sentiment.document.score}`);
                  commentScoreArr.push(Number(data3.sentiment.document.score));
                })
                .catch(err => console.log(err.message));
            });
            // Promise.resolve(() => {})

            return Promise.all(replyPromises)
              .then(() => {
                // console.log("Inner promise");
                // // console.log(results);
                // // console.log(commentScoreArr);
                ansObj.push({
                  replyScores: commentScoreArr,
                  answer: stripTags(answerStrings[orderInd]).trim()
                });
                orderInd++;
              })
              .catch(err => console.log(err + "   ll"));
          })
          .catch(err => console.log(err.message));
      });

      Promise.all(apiPromises)
        .then(() => {
          console.log("outer promise");
          console.log("Ans Object");
          // console.log(ansObj);
          ansObj = ansObj.sort(
            (x, y) => replyAverage(y.replyScores) - replyAverage(x.replyScores)
          );
          res.json(ansObj);
          console.log(ansObj);
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err.message + " ffr"));
});

//@type     GET
//@route    /query/api/test
//@desc     Route to test /query/api/question/:questionID
//@access   PUBLIC
router.get("/api/test", (req, res) => {
  res.sendFile("appSimple.html", {
    root: path.join(__dirname, "../../../public")
  });
});
module.exports = router;
