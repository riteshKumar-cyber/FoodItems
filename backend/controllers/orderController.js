import dotenv from "dotenv";
dotenv.config();

import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import foodModel from "../models/foodModel.js"; // ✅ make sure this is imported
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const frontend_url = "https://food-fronted-zeqy.onrender.com";

const placeOrder = async (req, res) => {
  try {
    // ✅ Step 1: Save the new order to DB
    const newOrder = new orderModel({
      userId: req.userId,
      items: req.body.items, // contains itemId and quantity
      amount: req.body.amount,
      address: req.body.address,
    });

    await newOrder.save();

    // ✅ Step 2: Clear user's cart
    await userModel.findByIdAndUpdate(req.userId, {
      cartData: {},
    });

    // ✅ Step 3: Fetch item details from DB for Stripe
    const itemIds = req.body.items.map(item => item.itemId);
    const foodItems = await foodModel.find({ _id: { $in: itemIds } });

    // ✅ Step 4: Build Stripe line items
    const line_items = req.body.items.map(item => {
      const food = foodItems.find(f => f._id.toString() === item.itemId);
      if (!food) {
        throw new Error(`Food item not found: ${item.itemId}`);
      }

      return {
        price_data: {
          currency: "inr",
          product_data: {
            name: food.name,
          },
          unit_amount: Math.round(food.price * 100),
        },
        quantity: item.quantity,
      };
    });

    // ✅ Step 5: Add delivery fee
    line_items.push({
      price_data: {
        currency: "inr",
        product_data: {
          name: "Delivery Charges",
        },
        unit_amount: 2 * 100,
      },
      quantity: 1,
    });

    // ✅ Step 6: Create Stripe session
    const session = await stripe.checkout.sessions.create({
      line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });

    // ✅ Final response
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    console.error("Stripe error:", error); // ✅ full object for debugging
    res.status(500).json({ success: false, message: error.message || "Unknown error" });
  }
};


const verifyOrder = async (req, res) => {
  const { orderId, success } = req.body;
  try {
    if (success == "true") {
      await orderModel.findByIdAndUpdate(orderId, {
        payment: true,
        status: "Food Processing"
      });
      res.json({ success: true, message: "paid" });
    } else {
      await orderModel.findByIdAndDelete(orderId);
      res.json({ success: false, message: "not paid" });
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// user orders for frontened
const userOrders = async (req, res) => {
  try {
    console.log("userId from token:", req.userId); // 🔍 Add this line

    const orders = await orderModel
      .find({ userId: req.userId })
      .populate("items.itemId");

    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


//listing orders for admin panel

const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({}) // optionally: .populate("items.itemId").populate("userId");
    res.json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error); // full error details
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};

//api for updating order status
const updateStatus  =async (req,res)=>{
try {
await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status});
res.json({success:true,message:"Status Updated"})
}catch(error){
console.log(error);
res.json({success:false,message:"Error"})
}
}



export { placeOrder,verifyOrder,userOrders ,listOrders ,updateStatus};
