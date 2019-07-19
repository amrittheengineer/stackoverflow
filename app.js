const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 5000;
const watsonAPI = require("./routes/api/watson/auth");
const googleAPI = require("./routes/api/google/auth");

app.use("/watson/api/test", express.static(__dirname + "/public"));
app.use("/google/api/test", express.static(__dirname + "/public"));

app.use(bodyparser.urlencoded({ extended: true }));

app.use("/watson", watsonAPI);
app.use("/google", googleAPI);

app.get("/", (req, res) => {
  res.redirect("/google/api/test");
});

app.listen(port, () => console.log(`App is running at port ${port}...`));
