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

const homeRouter = express.Router();

homeRouter.get(routes.home, home);
homeRouter.get(routes.join, getJoin);
homeRouter.post(routes.join, postJoin, postLogin);
homeRouter.get(routes.login, getLogin);
homeRouter.post(routes.login, postLogin);
homeRouter.get(routes.logout, logout);

export default homeRouter;
