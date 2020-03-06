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

export const userPrivate = (req, res, next) => {
  if (req.user) {
    req.flash("error", "올바르지 못한 접근입니다.");
    res.redirect(routes.home);
  } else {
    next();
  }
};

export const localPrivate = (req, res, next) => {
  if (req.user) {
    next();
  } else {
    req.flash("error", "로그인이 필요합니다.");
    res.redirect(routes.home);
  }
};
