import express from "express";
import routes from "../routes";
import {
  getMake,
  postMake,
  getEdit,
  postEdit,
  Update,
  Delete,
  getPost
} from "../controller/postController";
import { userPrivate, localPrivate } from "../middleware";

const postRouter = express.Router();

postRouter.get(routes.make, localPrivate, getMake);
postRouter.post(routes.make, localPrivate, postMake);
postRouter.get(routes.view(), getPost);
postRouter.get(routes.editBoard(), localPrivate, getEdit);
postRouter.post(routes.editBoard(), localPrivate, postEdit);
postRouter.get(routes.delete(), localPrivate, Delete);

export default postRouter;
