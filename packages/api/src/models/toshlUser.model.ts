import { Schema, model } from "mongoose";

const schema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  tags: {
    type: Object,
    required: true,
  },
});

export const ToshlUserModel = model("ToshlUser", schema, "toshlUsers");
