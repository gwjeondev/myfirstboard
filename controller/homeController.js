import passport from "passport";
import routes from "../routes";
import Post from "../models/Post";
import User from "../models/User";
import { getTime } from "./lib/getTime";

export const home = async (req, res) => {
  try {
    const board = await Post.find({})
      .sort({ createAt: -1 })
      .populate("creator");
    res.render("home", { pageTitle: "HOME", board });
  } catch (error) {
    res.render("home", { pageTitle: "HOME", board: [] });
  }
};

export const getJoin = (req, res) => {
  res.render("join");
};

export const postJoin = async (req, res, next) => {
  const { userid, name, password, password2 } = req.body;
  if (password !== password2) {
    res.redirect(routes.join);
  }
  try {
    const user = await User({
      userid,
      name
    });
    await User.register(user, password);
    next();
  } catch (error) {
    res.redirect(routes.join);
  }
};

export const getLogin = (req, res) => {
  res.render("login");
};

export const postLogin = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login"
});

export const logout = (req, res) => {
  req.logout();
  res.redirect(routes.home);
};
