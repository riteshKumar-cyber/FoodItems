import userModel from "../models/userModel.js"

// add items to user cart 
const addToCart = async (req, res) => {
    try {
        const userId = req.userId;
        const itemId = req.body.itemId;

        // <<< ADD THESE console.logs HERE >>>
        console.log("BACKEND: Received itemId for ADD:", itemId);
        console.log("BACKEND: User ID from token:", userId);

        if (!userId || !itemId) {
            return res.json({ success: false, message: "Missing userId or itemId" });
        }

        const userData = await userModel.findById(userId);
        if (!userData) {
            return res.json({ success: false, message: "User not found" });
        }

        let cartData = userData.cartData || {};

        // <<< ADD THIS console.log HERE >>>
        console.log("BACKEND: CartData BEFORE update:", cartData);

        if (!cartData[itemId]) {
            cartData[itemId] = 1;
        } else {
            cartData[itemId] += 1;
        }

        // <<< ADD THIS console.log HERE >>>
        console.log("BACKEND: CartData AFTER calculation:", cartData);

        await userModel.findByIdAndUpdate(userId, { cartData });

        res.json({ success: true, message: "Added To Cart" });
    } catch (error) {
        console.log("Add to Cart Error (Backend):", error); // Clarified log
        res.json({ success: false, message: "Error", error: error.message });
    }
};

// remove item from user cart

const removeFromCart = async (req, res) => {
  try {
    const userId = req.userId; // assuming authMiddleware sets req.userId
    const itemId = req.body.itemId;

    if (!userId || !itemId) {
      return res.json({ success: false, message: "Missing userId or itemId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};

    if (cartData[itemId] && cartData[itemId] > 0) {
      cartData[itemId] -= 1;

      // Optional: remove item if quantity becomes 0
      if (cartData[itemId] === 0) {
        delete cartData[itemId];
      }

      await userModel.findByIdAndUpdate(userId, { cartData });
      return res.json({ success: true, message: "Removed from cart" });
    } else {
      return res.json({ success: false, message: "Item not in cart" });
    }
  } catch (error) {
    console.log("Remove from Cart Error:", error);
    res.json({ success: false, message: "Error", error: error.message });
  }
};

// fetch user cart data
const getCart = async (req, res) => {
  try {
    const userId = req.userId;

    if (!userId) {
      return res.json({ success: false, message: "Missing userId" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.json({ success: false, message: "User not found" });
    }

    const cartData = userData.cartData || {};
    res.json({ success: true, cartData });

  } catch (error) {
    console.log("Get Cart Error:", error);
    res.json({ success: false, message: "Error", error: error.message });
  }
};


export {addToCart , removeFromCart,getCart}


