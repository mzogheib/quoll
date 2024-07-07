import { Schema, model } from "mongoose";

const schema = new Schema({
  feeds: {
    type: Array,
    required: true,
  },
});

export const UserModel = model("User", schema, "users");
