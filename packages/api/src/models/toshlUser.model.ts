import { Schema, model } from "mongoose";

const schema = new Schema({
  accessToken: {
    type: String,
    required: true,
  },
  tags: {
    type: [
      {
        id: { type: String, required: true },
        name: { type: String, required: true },
      },
    ],
  },
});

export const ToshlUserModel = model("ToshlUser", schema, "toshlUsers");
