import { config } from "dotenv";
config();

import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();

app.use(express.json());
app.use(cors());

const dataModel = require("./models/dataModel");

app.get("/getdata", (req, res) => {
  dataModel.find({}).then((err: any, result: any) => {
    if (err) {
      res.json(err);
    } else {
      res.json(result);
    }
  });
});

app.post("/postdata", async (req, res) => {
  const data = req.body;
  const newData = new dataModel(data);
  await newData.save();

  res.json(data);
});

mongoose.connect(process.env.MONGO_URL!).then(() => {
  app.listen(process.env.PORT);
  console.log(`listening on port ${process.env.PORT}`);
});
