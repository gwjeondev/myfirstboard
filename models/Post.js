import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  createAt: {
    type: Date,
    default: Date.now
  },
  createTime: {
    type: String,
    required: true
  },
  comment: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }
});

const model = mongoose.model("Post", postSchema);

export default model;
