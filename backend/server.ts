import express, { Express, Request, Response } from "express";
import cors from "cors";
import messageRouter from "./routes/messages";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import history from "connect-history-api-fallback";

const app: Express = express();
dotenv.config();

const path = "../backend/dist/views/dist";
const port: string | 3000 = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use("/messages", messageRouter);
app.use(express.static(path));
app.listen(port);
app.use(
  history({
    disableDotRule: true,
    verbose: true,
  })
);
app.use(express.static(path));
app.get("/", function (req: Request, res: Response) {
  res.sendFile(path + "index.html");
});
