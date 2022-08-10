"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var dotenv = require("dotenv");
var typeorm_1 = require("typeorm");
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
dotenv.config();
exports.AppDataSource = new typeorm_1.DataSource({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [process.env.ENTITIES || 'src/entities/**/*.ts'],
    migrations: [process.env.MIGRATIONS || 'src/migrations/**/*.ts'],
    logging: true,
    logger: 'simple-console',
    // synchronize: true
    ssl: true,
    extra: {
        ssl: {
            rejectUnauthorized: false
        }
    }
});
// host: process.env.HOST,
// username: process.env.USER,
// port: +process.env.PORTDB,
// database: process.env.DATABASE,
// password: String(process.env.PASSWORD),
//# sourceMappingURL=dataSource.js.map