const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const port = process.env.PORT || 5000;
const watsonAPI = require("./routes/api/watson/auth");

app.use("/watson/api/test", express.static(__dirname + "/public"));

app.use(bodyparser.urlencoded({ extended: true }));

app.use("/watson", watsonAPI);

app.get("/", (req, res) => {
  res.redirect("/watson/api/test");
});

app.listen(port, () => console.log(`App is running at port ${port}...`));
