import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema({
  text: String,
  sender: String,
  walletAddress: String,
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.models.Message ||
  mongoose.model("Message", MessageSchema);
