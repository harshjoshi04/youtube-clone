import { model, Schema } from "mongoose";

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "Name must be required"],
  },
  email: {
    type: String,
    required: [true, "Email must be required."],
    unique: [true, "Email must be unique."],
  },
  image: {
    type: String,
    required: [true, "Image must be required."],
  },
});

const UserModel = model("Users", UserSchema);

export default UserModel;
