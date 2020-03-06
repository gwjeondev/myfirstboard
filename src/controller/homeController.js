import passport from "passport";
import routes from "../routes";
import Post from "../models/Post";
import User from "../models/User";
import paging from "./lib/paging";

export const home = async (req, res) => {
  const { page } = req.query;
  try {
    const totalPost = await Post.countDocuments({});
    if (!totalPost) {
      throw Error();
    }
    let {
      startPage,
      endPage,
      hidePost,
      maxPost,
      totalPage,
      currentPage
    } = paging(page, totalPost);
    const board = await Post.find({})
      .sort({ createAt: -1 })
      .populate("creator")
      .populate({ path: "comments", select: "exist" })
      .skip(hidePost)
      .limit(maxPost);
    res.render("home", {
      pageTitle: "HOME",
      board,
      currentPage,
      startPage,
      endPage,
      maxPost,
      totalPage,
      index: "home"
    });
  } catch (error) {
    res.render("home", { pageTitle: "HOME", board: [] });
  }
};

export const search = async (req, res) => {
  const { term, page } = req.query;
  try {
    const totalPost = await Post.countDocuments({
      title: { $regex: term, $options: "i" }
    });
    if (!totalPost) {
      res.render("emptySearch", { pageTitle: "EMPTY" });
      return 0;
    }
    const {
      startPage,
      endPage,
      hidePost,
      maxPost,
      totalPage,
      currentPage
    } = paging(page, totalPost);
    const board = await Post.find({
      title: { $regex: term, $options: "i" }
    })
      .sort({ createAt: -1 })
      .populate("creator")
      .populate({ path: "comments", select: "exist" })
      .skip(hidePost)
      .limit(maxPost);
    res.render("home", {
      pageTitle: "SEARCH",
      term,
      board,
      currentPage,
      startPage,
      endPage,
      maxPost,
      totalPage,
      index: "post"
    });
  } catch (error) {
    res.redirect(routes.home);
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
  failureRedirect: "/login",
  successFlash: "로그인 성공",
  failureFlash: "아이디 또는 비밀번호를 확인하세요"
});

export const logout = (req, res) => {
  req.logout();
  req.flash("success", "로그아웃 성공");
  res.redirect(routes.home);
};
