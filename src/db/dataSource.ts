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
dotenv.config()
export const AppDataSource = new DataSource({
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
        
        
        