import mongoose from "mongoose";
import bcrypt from "bcrypt";
const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
    select: false,
    minLength: [6, "Password must be at least 6 characters long"],
  },
});
Schema.pre("save", async function () {
  if (!this.password) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
Schema.methods.comparepasswords = async function (checkpass: string) {
  const ismatch = await bcrypt.compare(checkpass, this.password);
  return ismatch;
};
export const User = mongoose.model("User", Schema);
