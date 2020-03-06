import express from "express";
import routes from "../routes";
import { getEditProfile, postEditProfile, getChangePassword, postChangePassword } from "../controller/userController";
import { localPrivate } from "../middleware";

const userRouter = express.Router();

userRouter.get(routes.editProfile, localPrivate, getEditProfile);
userRouter.post(routes.editProfile, localPrivate, postEditProfile);
userRouter.get(routes.changePassword, localPrivate, getChangePassword);
userRouter.post(routes.changePassword, localPrivate, postChangePassword);

export default userRouter;
