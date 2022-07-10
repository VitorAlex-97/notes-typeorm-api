import "reflect-metadata"
import "dotenv"
import * as express from "express"
import { AppDataSource } from "./db/dataSource"
import * as cors from "cors"
import router from "./routes/index.routes";  
import * as bodyParser from "body-parser"
import { Request, Response } from "express"
import { User } from "./entities/User"
import { createConnection, DataSource } from "typeorm"
import helmet from "helmet"

const API = "/api/v2";

const server = express();
const jsonBodyParser = bodyParser.json();
const urlEncoderParser = bodyParser.urlencoded();

server.use(helmet());
server.use(jsonBodyParser);
server.use(urlEncoderParser);

server.use(API, router);

AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized!")
})
.catch((error) => console.log(`Erro: ${error}`));

server.listen(3000, () => {
    console.log(`Servidor rodando em http://localhost:3000`);
});
