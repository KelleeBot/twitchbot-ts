import { model, Schema } from "mongoose";

const channelSchema = new Schema({
    _id: String,
    prefix: {
        default: "!",
        type: String
    },
    disabledCommands: Array,
    commandPerms: {},
    commandCooldowns: {},
    commandAlias: {}
});

export default model("kellee", channelSchema, "kellee"); // Creating separate schema to prevent other bot from joining Kellee's channel
