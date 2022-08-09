import "reflect-metadata";
import * as dotenv from "dotenv";
import { DataSource } from "typeorm"
import { User } from "../entities/User";
import { Note } from "../entities/Note";
import { Category } from "../entities/Category";

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
export const AppDataSource = new DataSource({
    url: process.env.DATABASE_URL,
    type: 'postgres',
    entities: [User, Category, Note],
    migrations: ['src/migrations/**/*.ts'],
    logging: true,
    logger: 'simple-console',
    // synchronize: true
});



