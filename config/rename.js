const fs = require("fs");
const path = require("path");

fs.rename(path.resolve(__dirname, "../dist2"), path.resolve(__dirname, "../dist"), function (err) {
  if (err) console.log(err);
});
