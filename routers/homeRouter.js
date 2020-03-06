import express from "express";
import routes from "../routes";
import {
  home,
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout
} from "../controller/homeController";
import { userPrivate, localPrivate } from "../middleware";

const homeRouter = express.Router();

homeRouter.get(routes.home, home);
homeRouter.get(routes.join, userPrivate, getJoin);
homeRouter.post(routes.join, userPrivate, postJoin, postLogin);
homeRouter.get(routes.login, userPrivate, getLogin);
homeRouter.post(routes.login, userPrivate, postLogin);
homeRouter.get(routes.logout, localPrivate, logout);

export default homeRouter;
