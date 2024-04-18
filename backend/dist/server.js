"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const messages_1 = __importDefault(require("./routes/messages"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const app = (0, express_1.default)();
dotenv_1.default.config();
const port = process.env.PORT || 3000;
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use("/messages", messages_1.default);
app.listen(port);
