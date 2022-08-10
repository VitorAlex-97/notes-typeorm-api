"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv = require("dotenv");
require("reflect-metadata");
var express = require("express");
var dataSource_1 = require("./db/dataSource");
var cors = require("cors");
var index_routes_1 = require("./routes/index.routes");
var bodyParser = require("body-parser");
var helmet_1 = require("helmet");
var API = "/api/v2";
var server = express();
var jsonBodyParser = bodyParser.json();
var urlEncoderParser = bodyParser.urlencoded();
dotenv.config();
server.use((0, helmet_1.default)());
server.use(jsonBodyParser);
server.use(urlEncoderParser);
server.use(cors());
server.use(API, index_routes_1.default);
(function () { return dataSource_1.AppDataSource.initialize().then(function () {
}); })()
    .catch(function (error) { return console.log("Erro: ".concat(error)); });
console.log("Data Source has been initialized!");
server.listen(process.env.PORT || 3000, function () {
    console.log("Server is running");
});
//# sourceMappingURL=index.js.map