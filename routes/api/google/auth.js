const express = require("express");
const router = express.Router();
const setup = require("../../../setup/myurl");

router.post("/api", (req, res) => {
  let query = req.body.query;
  console.log(query);
});

router.get("/api/test", (req, res) => {
  res.sendFile("google.html");
});
module.exports = router;
