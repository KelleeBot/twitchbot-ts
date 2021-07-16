import { model, Schema } from "mongoose";

const blacklist = new Schema(
    {
        _id: String
    },
    { strict: false }
);

export default model("blacklist", blacklist);
