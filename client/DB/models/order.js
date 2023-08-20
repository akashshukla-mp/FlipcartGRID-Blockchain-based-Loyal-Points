import mongoose from "mongoose";

const { Schema } = mongoose;
const { ObjectId } = mongoose.Schema;

const orderSchema = new Schema({

    products: [{type: ObjectId, ref: "Product"}], 
    payment: {},
    buyer: {type: ObjectId, ref: "User"},
    rewardPointSpent: {type: Number, default: 0},
    status: {type: String, default: "Not processed", enum: [
        "Not processed", "Processing", "Shipped", "Delivered", "Cancelled"],
    }
}, {timestamps: true});

export default mongoose.model("Order", orderSchema);