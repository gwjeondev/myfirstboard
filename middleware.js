import routes from "./routes";

export const localMiddleWare = (req, res, next) => {
  res.locals.siteName = "Board";
  res.locals.routes = routes;
  res.locals.loggedUser = req.user || null;
  next();
};

export const notPageError = (req, res, next) => {
  res.status(404);
  res.render("notpageerror");
};
