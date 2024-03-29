import * as dotenv from "dotenv";
import "reflect-metadata"
import * as express from "express"
import { AppDataSource } from "./db/dataSource"
import * as cors from "cors"
import router from "./routes/index.routes";  
import * as bodyParser from "body-parser"
import helmet from "helmet"

const API = "/api/v2";

const server = express();
const jsonBodyParser = bodyParser.json();
const urlEncoderParser = bodyParser.urlencoded();

dotenv.config()

server.use(helmet());
server.use(jsonBodyParser);
server.use(urlEncoderParser);
server.use(cors())

server.use(API, router);

(() => AppDataSource.initialize().then(() => {
}))()
.catch((error) => console.log(`Erro: ${error}`));

console.log("Data Source has been initialized!")

server.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running`);
});
