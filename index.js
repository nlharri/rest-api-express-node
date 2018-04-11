var express = require("express");
var routes = require("./routes.js");
var app = express();

routes(app);

var server = app.listen(3000, function () {
    console.log(`Example app listening on port ${server.address().port}!`);
});
