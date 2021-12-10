import { model, Schema } from "mongoose";

const famous = new Schema(
    {
        _id: String
    },
    { strict: false }
);

export default model("famousLinks", famous);
