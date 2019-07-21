const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 5000;
const watsonAPI = require("./routes/api/watson/auth");
const queryAPI = require("./routes/api/query/auth");
const stackoverflowAPI = require("./routes/api/stackoverflow/auth");

app.use(express.static(__dirname + "/public"));

app.use(bodyparser.urlencoded({ extended: true }));

app.use("/watson", watsonAPI);
app.use("/query", queryAPI);
app.use("/stackoverflow", stackoverflowAPI);

//@type     GET
//@route    /
//@desc     To route the main page of the app and to activate the text-similarity server
//@access   PUBLIC
app.get("/", (req, res) => {
  var spawn = require("child_process").spawn;
  var process = spawn("python", ["./text-similarity/app.py"]);
  res.redirect("/stackoverflow/api/test");
});

app.listen(port, () => console.log(`App is running at port ${port}...`));
