import dotenv from "dotenv";
import app from "./app";
import "./db";
import "./models/Post";
import "./models/Comment";
import "./models/User";

dotenv.config();

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`⌚ 서버 오픈!! http://localhost:${PORT}`);
});
