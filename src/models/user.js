import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "please provide the username"],
    unique: true,
  },
  email: {
    type: String,
    required: [true, "please provide the email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "please provide the password"],
    unique: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  forgotPasswordToken: String,
  forgotPasswordTokenExpiry: Date,
  verifiedToken: String,
  verifiedTokenExpiry: Date,
});

const user = mongoose.models.User || mongoose.model("User", userSchema);
export default user;
