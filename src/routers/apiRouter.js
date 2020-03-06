import express from "express";
import routes from "../routes";
import { registerView } from "../controller/postController";
import { like } from "../controller/likeController";
import { addComment, delComment, addReply } from "../controller/commentController";
import { localPrivate } from "../middleware";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, localPrivate, addComment);
apiRouter.post(routes.delComment, localPrivate, delComment);
apiRouter.post(routes.like, localPrivate, like);
apiRouter.post(routes.addReply, localPrivate, addReply);

export default apiRouter;
