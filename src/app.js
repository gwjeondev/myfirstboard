import "@babel/polyfill";
import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import flash from "express-flash";
import passport from "passport";
import session from "express-session";
import MongoStore from "connect-mongo";
import routes from "./routes";
import morgan from "morgan";
import helmet from "helmet";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import homeRouter from "./routers/homeRouter";
import postRouter from "./routers/postRouter";
import userRouter from "./routers/userRouter";
import apiRouter from "./routers/apiRouter";
import "./passport";
import { localMiddleWare, notPageError } from "./middleware";

dotenv.config();

const app = express();

const CookieStore = MongoStore(session);

app.use(helmet());
app.use(morgan("dev"));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
    store: new CookieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use(localMiddleWare);

app.use(routes.home, homeRouter);
app.use(routes.post, postRouter);
app.use(routes.user, userRouter);
app.use(routes.api, apiRouter);

app.use(notPageError);

export default app;
