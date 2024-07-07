import { Schema, model } from "mongoose";

const schema = new Schema({
  feeds: {
    type: Array,
    required: true,
  },
});

export default model("User", schema, "users");
