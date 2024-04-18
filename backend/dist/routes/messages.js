"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const express_1 = __importDefault(require("express"));
const node_fs_1 = __importDefault(require("node:fs"));
const uuid_1 = require("uuid");
const router = express_1.default.Router();
router
    .post("/new", (req, res) => {
    const timestamp = new Date().getTime();
    const seperator = "_____";
    const filename = (0, uuid_1.v4)();
    const message = JSON.stringify(req.body);
    node_fs_1.default.writeFile(`${__dirname}/${filename}${seperator}${timestamp}.txt`, message, (error) => {
        if (error) {
            return res.send(error);
        }
        else {
            res.status(200).json({ filename, seperator, timestamp });
        }
    });
})
    .get("/:id", (req, res) => {
    const id = req.params.id;
    node_fs_1.default.stat(`${__dirname}/${id}.txt`, (error) => {
        if (error) {
            res.status(404).send("File doesn't exists!");
        }
        else {
            node_fs_1.default.readFile(`${__dirname}/${id}.txt`, "utf-8", (error, data) => {
                if (error) {
                    return res.send(error);
                }
                else {
                    const message = JSON.parse(data);
                    res.status(200).json(message);
                    node_fs_1.default.unlink(`${__dirname}/${id}.txt`, (error) => {
                        if (error) {
                            res.send(error);
                        }
                        else {
                            // successfully deleted
                        }
                    });
                }
            });
        }
    });
});
module.exports = router;
