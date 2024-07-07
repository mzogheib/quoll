import { Schema, model } from "mongoose";

const schema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  tags: {
    type: Object,
  },
});

export const ToshlUserModel = model("ToshlUser", schema, "toshlUsers");
