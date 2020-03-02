import express from "express";
import routes from "../routes";
import { getEditProfile, postEditProfile } from "../controller/userController";

const userRouter = express.Router();

userRouter.get(routes.editProfile, getEditProfile);
userRouter.post(routes.editProfile, postEditProfile);

export default userRouter;
