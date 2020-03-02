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

const postRouter = express.Router();

postRouter.get(routes.make, getMake);
postRouter.post(routes.make, postMake);
postRouter.get(routes.view(), getPost);
postRouter.get(routes.editBoard(), getEdit);
postRouter.post(routes.editBoard(), postEdit);
postRouter.get(routes.delete(), Delete);

export default postRouter;
