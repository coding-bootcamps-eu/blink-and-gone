import express, { Request, Response, Router } from "express";
import fs from "node:fs";
import { v4 } from "uuid";

const router: Router = express.Router();

router
  .post("/new", (req: Request, res: Response) => {
    const timestamp: number = new Date().getTime();
    const seperator: string = "_____";
    const filename: string = v4();
    const message: string = JSON.stringify(req.body);
    fs.writeFile(
      `${__dirname}/${filename}${seperator}${timestamp}.txt`,
      message,
      (error: NodeJS.ErrnoException | null) => {
        if (error) {
          return res.send(error);
        } else {
          res.status(200).json({ filename, seperator, timestamp });
        }
      }
    );
  })
  .get("/:id", (req: Request, res: Response) => {
    const id = req.params.id;
    fs.stat(`${__dirname}/${id}.txt`, (error) => {
      if (error) {
        res.status(404).send("File doesn't exists!");
      } else {
        fs.readFile(
          `${__dirname}/${id}.txt`,
          "utf-8",
          (error: NodeJS.ErrnoException | null, data: string) => {
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
          }
        );
      }
    });
  });

export = router;
