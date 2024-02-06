import { Schema, model } from "mongoose";

const schoolSchema = new Schema({
  name: String,
  address: String,
  tel: String,
  email: { type: String, unique: true },
  admin: {
    type: Schema.Types.ObjectId,
    ref: "user",
  },
  deleted: Boolean,
});

export default model("school", schoolSchema);
