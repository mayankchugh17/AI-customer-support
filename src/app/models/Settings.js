import mongoose from "mongoose";

const SettingsSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true,
        unique: true
    },
    businessName: {
        type: String,
        required: true
    },
    supportEmail: {
        type: String,
        required: true
    },
    knowledge: {
        type: String,
        required: true
    },
}, { timestamps:true });

const Settings = mongoose.model("Settings", SettingsSchema);

export default Settings;