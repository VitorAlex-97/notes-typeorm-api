"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("../entities/User");
var Note_1 = require("../entities/Note");
var Category_1 = require("../entities/Category");
/*** PROD *****/
// export const AppDataSource = new DataSource({
//     type: "postgres",
//     url: process.env.DATABASE_URL,
//     ssl: {
//         rejectUnauthorized: false
//     },
//     entities: [User, Category, Note],
//     migrations: ['src/migrations/**/*.ts']
// });
/***** DEV ********/
exports.AppDataSource = new typeorm_1.DataSource({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [User_1.User, Category_1.Category, Note_1.Note],
    migrations: ['src/migrations/**/*.ts'],
    logging: true,
    logger: 'simple-console',
    // synchronize: true
});
//# sourceMappingURL=dataSource.js.map