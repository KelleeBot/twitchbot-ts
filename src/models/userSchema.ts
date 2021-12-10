import { model, Schema } from "mongoose";

const userSchema = new Schema({
    _id: String,
    isBlacklisted: {
        default: false,
        type: Boolean
    }
});

export default model("users", userSchema);
