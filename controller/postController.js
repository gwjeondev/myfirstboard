import routes from "../routes";
import Post from "../models/Post";
import { getTime } from "./lib/getTime";

export const getMake = (req, res) => {
  res.render("make");
};
export const postMake = async (req, res) => {
  const { title, content } = req.body;
  try {
    const post = await Post.create({
      title,
      content,
      creator: req.user.id,
      createTime: getTime(new Date())
    });
  } catch (error) {
    res.redirect(routes.home);
  }
  res.redirect(routes.home);
};
export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id).populate("creator");
    res.render("view", { pageTitle: "POST", post });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const getEdit = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    res.render("editBoard", { pageTitle: "EDIT", post });
  } catch (error) {
    res.redirect(routes.home);
  }
};
export const postEdit = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  try {
    const post = await Post.findByIdAndUpdate(
      { _id: id },
      {
        title,
        content
      }
    );
  } catch (error) {
    res.redirect(routes.view(id));
  } finally {
    res.redirect(routes.view(id));
  }
};

export const Delete = async (req, res) => {
  const { id } = req.params;
  try {
    await Post.findByIdAndRemove({ _id: id });
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.home);
  }
};
