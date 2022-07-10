import "reflect-metadata"
import "dotenv"
import { DataSource } from "typeorm"
import { User } from "../entities/User";
import { Note } from "../entities/Note";
import { Category } from "../entities/Category";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "devnotes",
    entities: [User, Category, Note],
    migrations: ['src/migrations/**/*.ts'],
    ssl: {
        rejectUnauthorized: false
    }
});




