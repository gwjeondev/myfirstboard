import express from "express";
import routes from "../routes";
import { registerView } from "../controller/postController";
import { like } from "../controller/likeController";
import { addComment, delComment, addReply } from "../controller/commentController";

const apiRouter = express.Router();

apiRouter.post(routes.registerView, registerView);
apiRouter.post(routes.addComment, addComment);
apiRouter.post(routes.delComment, delComment);
apiRouter.post(routes.like, like);
apiRouter.post(routes.addReply, addReply);
apiRouter.post(routes.delReply);

export default apiRouter;
