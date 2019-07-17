const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

// Test route
app.get("/", (req, res) => {
  res.json({
    success: true
  });
});

app.listen(port, () => console.log(`App is running at port ${port}...`));
