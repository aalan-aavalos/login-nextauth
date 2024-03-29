import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: [true, "Email is requiered"],
  },
  password: {
    type: String,
    required: [true, "Password is requiered"],
    // select: false,
  },
  fullname: {
    type: String,
    required: [true, "Fullname is requiered"],
  },
  rol: {
    type: String,
    require: [true, "el rol es reqerido"],
    default: "usr",
  },
});

export default models.User || model("User", userSchema);
