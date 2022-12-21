const express = require("express");
const app = express();
const port = 3001;
const {loginWithLinkedin} = require("./middleware");
const passport = require("passport");


app.get("/",loginWithLinkedin);

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
