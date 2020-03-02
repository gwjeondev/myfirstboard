const HOME = "/";
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const USER = "/user";
const EDITPROFILE = "/edit-profile";
const POST = "/post";
const MAKE = "/make";
const VIEW = "/:id";
const EDITBOARD = "/:id/edit";
const DELETE = "/:id/delete";

const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  user: USER,
  editProfile: EDITPROFILE,
  post: POST,
  make: MAKE,
  view: id => (id ? `/post/${id}` : VIEW),
  editBoard: id => (id ? `/${id}/edit` : EDITBOARD),
  delete: id => (id ? `/${id}/delete` : DELETE)
};

export default routes;
