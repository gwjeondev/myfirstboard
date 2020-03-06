import mongoose from "mongoose";
import { booleanLiteral } from "babel-types";

const CommentSchema = new mongoose.Schema({
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Post"
  },
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
  parent: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  },
  child: [
    {
      type: Object
    }
  ],
  exist: {
    type: Boolean,
    default: true
  }
});

const model = mongoose.model("Comment", CommentSchema);

export default model;
