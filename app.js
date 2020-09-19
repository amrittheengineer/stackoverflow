const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 5000;
const watsonAPI = require("./routes/api/watson/auth");
const googleAPI = require("./routes/api/google/auth");
const stackoverflowAPI = require("./routes/api/stackoverflow/auth");

app.use(require("cors")());
app.use(express.static(__dirname + "/ui/build"));

app.use(bodyparser.urlencoded({ extended: true }));

app.use("/watson", watsonAPI);
app.use("/google", googleAPI);
app.use("/stackoverflow", stackoverflowAPI);

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/ui/build/index.html");
});

app.listen(port, () => console.log(`App is running at port ${port}...`));
