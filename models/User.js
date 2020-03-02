import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
  userid: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  comments: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Comment"
  }
});

UserSchema.plugin(passportLocalMongoose, { usernameField: "userid" });

const model = mongoose.model("User", UserSchema);

export default model;
