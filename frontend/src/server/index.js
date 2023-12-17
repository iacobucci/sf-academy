"use strict";
exports.__esModule = true;
var path_1 = require("path");
var fs_1 = require("fs");
var react_1 = require("react");
var server_1 = require("react-dom/server");
var express_1 = require("express");
var App_1 = require("../App");
var PORT = process.env.PORT || 3006;
var app = (0, express_1["default"])();
app.get('/', function (req, res) {
    var app = (0, server_1.renderToString)(react_1["default"].createElement(App_1["default"]));
    var indexFile = path_1["default"].resolve('../../build/index.html');
    fs_1["default"].readFile(indexFile, 'utf8', function (err, data) {
        if (err) {
            console.error('Something went wrong:', err);
            return res.status(500).send('Oops, better luck next time!');
        }
        return res.send(data.replace('<div id="root"></div>', "<div id=\"root\">".concat(app, "</div>")));
    });
});
app.use(express_1["default"].static('./build'));
app.listen(PORT, function () {
    console.log("Server is listening on port ".concat(PORT));
});
