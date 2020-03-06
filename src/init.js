import dotenv from "dotenv";
import herokuselfping from "heroku-self-ping";
import app from "./app";
import "./db";
import "./models/Post";
import "./models/Comment";
import "./models/User";

dotenv.config();

herokuselfping(`https://${process.env.HEROKU_APP_NAME}.herokuapp.com`);
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`⌚ 서버 오픈!! http://localhost:${PORT}`);
});
