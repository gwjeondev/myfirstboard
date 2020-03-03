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
const API = "/api";
const REGISTER_VIEW = "/:id/views";
const ADD_COMMENT = "/:id/comment";
const DEL_COMMENT = "/:id/comment-delete";
const LIKE_POST = "/:id/like";
const ADD_REPLY = "/:id/reply";
const DEL_REPLY = "/:id/reply-delete";

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
  delete: id => (id ? `/${id}/delete` : DELETE),
  api: API,
  registerView: REGISTER_VIEW,
  addComment: ADD_COMMENT,
  delComment: DEL_COMMENT,
  like: LIKE_POST,
  addReply: ADD_REPLY,
  delReply: DEL_REPLY
};

export default routes;
