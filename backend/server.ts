import express, { Express } from "express";
import cors from "cors";
import messageRouter from "./routes/messages";
import bodyParser from "body-parser";
import dotenv from "dotenv";

const app: Express = express();
dotenv.config();

const port: string | 3000 = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/messages", messageRouter);
app.listen(port);
