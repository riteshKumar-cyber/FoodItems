import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },

  items: [
    {
      itemId: { type: mongoose.Schema.Types.ObjectId, ref: "food", required: true },
      quantity: { type: Number, required: true },
    }
  ],

  amount: { type: Number, required: true },

  address: {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zipcode: { type: String, required: true },
    country: { type: String, required: true },
    phone: { type: String, required: true },
  },

  status: {
    type: String,
    enum: ["Pending", "Food Processing", "Delivered", "Paid"],
    default: "Pending",
  },

  date: { type: Date, default: Date.now },

  payment: { type: Boolean, default: false },
});

const orderModel =
  mongoose.models.order || mongoose.model("order", orderSchema);

export default orderModel;
