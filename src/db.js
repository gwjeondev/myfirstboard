import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const GET_DB_URL = () => {
  if(process.env.NODE_ENV = "production") {
    return process.env.MONGO_URL_PROD;
  }
  return process.env.MONGO_URL;
}

const URL = GET_DB_URL();

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

const handleOpen = () => console.log("✅  몽구스 연결 완료");
const handleError = err => console.log(`❌ 몽구스 연결 실패 ${err}`);

db.once("open", handleOpen);
db.on("error", handleError);
