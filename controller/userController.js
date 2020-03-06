import passport from "passport";
import User from "../models/User";
import routes from "../routes";

export const getEditProfile = async (req, res) => {
  if (!req.user) {
    res.redirect(routes.home);
  }
  try {
    const user = await User.findById(req.user.id);
    res.render("editProfile", { pageTitle: "EDIT", user });
  } catch (error) {}
};

export const postEditProfile = async (req, res) => {
  const { name } = req.body;
  try {
    req.user.name = name;
    req.user.save();
    req.flash("success", "정보 수정 성공!");
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};

export const getChangePassword = async (req, res) => {
  res.render("changePassword");
};
export const postChangePassword = async (req, res) => {
  const { password, newpassword, newpassword2 } = req.body;
  try {
    if(newpassword !== newpassword2) {
      throw Error();
    }
    await req.user.changePassword(password, newpassword);
    req.user.save();
    res.redirect(routes.home);
  } catch(error) {
    req.flash("error", "비밀번호를 확인하세요.");
    res.redirect(`/user${routes.changePassword}`);
  }
};
