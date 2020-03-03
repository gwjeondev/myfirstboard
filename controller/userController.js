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
  const { name, password, newpassword, newpassword2 } = req.body;
  if (password) {
    if (newpassword === newpassword2) {
      req.user.changePassword(password, newpassword);
    } else {
      res.redirect(routes.editProfile);
    }
  }
  try {
    const user = await User.updateOne(
      { _id: req.user.id },
      {
        name
      }
    );
    res.redirect(routes.home);
  } catch (error) {
    res.redirect(routes.editProfile);
  }
};
