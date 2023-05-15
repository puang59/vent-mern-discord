import mongoose from "mongoose";

const dataSchema = new mongoose.Schema({
  para: {
    type: String,
  },
  username: {
    type: String,
  },
});

const dataModel = mongoose.model("data", dataSchema);
module.exports = dataModel;
