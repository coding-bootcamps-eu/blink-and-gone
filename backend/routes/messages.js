const express = require("express");
const router = express.Router();
const data = require("../db.json");
const fs = require("node:fs");
const { v4 } = require("uuid");

router
  .post("/new", (req, res) => {
    const timestamp = new Date().getTime();
    const seperator = "_____";
    const filename = v4();
    const message = JSON.stringify(req.body);
    fs.writeFile(
      `${__dirname}/${filename}${seperator}${timestamp}.txt`,
      message,
      (error) => {
        if (error) {
          return res.send(error);
        } else {
          res.status(200).json({ filename, seperator, timestamp });
        }
      }
    );
  })
  .get("/:id", (req, res) => {
    const id = req.params.id;
    fs.stat(`${__dirname}/${id}.txt`, (error) => {
      if (error) {
        res.status(404).send("File doesn't exists!");
      } else {
        fs.readFile(`${__dirname}/${id}.txt`, "utf-8", (error, data) => {
          if (error) {
            return res.send(error);
          } else {
            const message = JSON.parse(data);
            res.status(200).json(message);
            fs.unlink(`${__dirname}/${id}.txt`, (error) => {
              if (error) {
                res.send(error);
              } else {
                // successfully deleted
              }
            });
          }
        });
      }
    });
  });

module.exports = router;
