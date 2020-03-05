import Comment from "../models/Comment";
import Post from "../models/Post";
import User from "../models/User";
import { getTime } from "./lib/getTime";

export const addComment = async (req, res) => {
  const { postId, text } = req.body;
  try {
    if (text === "") {
      throw Error();
    }
    const post = await Post.findById(postId);
    const user = req.user;
    const comment = await Comment.create({
      text,
      creator: user.id,
      post: post.id,
      createTime: getTime(new Date())
    });
    const sendComment = await Comment.findById(comment.id).populate("creator");
    user.comments.push(comment.id);
    post.comments.push(comment.id);
    post.save();
    user.save();
    res.send(sendComment);
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const delComment = async (req, res) => {
  const { postId, commentId } = req.body;
  try {
    const post = await Post.findById(postId);
    const user = req.user;
    await Comment.deleteOne({ _id: commentId });
    post.comments = post.comments.filter(i => i.toString() !== commentId);
    user.comments = user.comments.filter(i => i.toString() !== commentId);
    post.save();
    user.save();
  } catch (error) {
    res.status(400);
  } finally {
    res.end();
  }
};

export const addReply = async (req, res) => {
  const { parentId, text } = req.body;
  const { id } = req.params;
  try {
    const reply = await Comment.create({
      text,
      createTime: getTime(new Date()),
      creator: req.user.id,
      parent: parentId,
      post: id
    });
  } catch (error) {
  } finally {
    res.end();
  }
};
