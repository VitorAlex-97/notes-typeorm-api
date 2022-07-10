"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
require("dotenv");
var typeorm_1 = require("typeorm");
var User_1 = require("../entities/User");
var Note_1 = require("../entities/Note");
var Category_1 = require("../entities/Category");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "devnotes",
    entities: [User_1.User, Category_1.Category, Note_1.Note],
    migrations: ['src/migrations/**/*.ts']
});
//# sourceMappingURL=dataSource.js.map