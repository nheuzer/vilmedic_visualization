var express = require("express");
var path = require("path");

var vilmedicRouter = require("./routes/vilmedic");
var app = express();
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  if (!req.path.startsWith("/api/"))
    return res.sendFile(`${__dirname}/public/index.html`);
  next();
});

app.use("/api/vilmedic", vilmedicRouter);

module.exports = app;
