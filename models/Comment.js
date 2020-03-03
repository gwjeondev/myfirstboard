import mongoose from "mongoose";
import { booleanLiteral } from "babel-types";

const CommentSchema = new mongoose.Schema({
  text: {
    type: String,
    require: true
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  createTime: {
    type: String,
    require: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  creatorName: {
    type: String
  },
  parentComment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  },
  childComment: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
    }
  ],
  exist: {
    type: Boolean,
    default: true
  }
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
