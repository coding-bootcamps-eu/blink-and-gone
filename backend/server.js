const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const messageRouter = require("./routes/messages");
const bodyParser = require("body-parser");

app.use(cors());
app.use(bodyParser.json());
app.use("/messages", messageRouter);
app.listen(port);
