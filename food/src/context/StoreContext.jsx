import {createContext ,useState,useEffect} from "react";
import axios from "axios";
export const StoreContext = createContext(null)

const StoreContextProvider =(props) =>{
   
const[cartItems,setCartItems] = useState({});
const url = https://localhost:4000;

const [token,setToken] = useState("");
const  [food_list,setFoodList] = useState([])

const addToCart = async (itemId) => {
    if(!cartItems[itemId]) {
        setCartItems((prev)=>({...prev,[itemId]:1}))
    }
    else{
        setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1}))
    }

    // <<< ADD THIS console.log HERE >>>
    console.log("FRONTEND: ItemId being sent to backend for ADD:", itemId);

    if(token){
        try { // <<< ADD try/catch block around axios call for better error handling >>>
            await axios.post(url + "/api/cart/add",
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
        } catch (error) {
            console.error("Error adding to cart (frontend):", error);
            if (error.response) {
                console.error("FRONTEND: Backend response error data:", error.response.data);
                console.error("FRONTEND: Backend response error status:", error.response.status);
            }
        }
    }
}

// ... (existing imports and state)
const removeFromCart = async (itemId) => { // <<< ADD 'async' here
    setCartItems((prev)=> {
        const newCartItems = {...prev};
        if (newCartItems[itemId] && newCartItems[itemId] > 0) {
            newCartItems[itemId] -= 1;
            if (newCartItems[itemId] === 0) {
                delete newCartItems[itemId];
            }
        }
        return newCartItems;
    });

    // <<< ADD THIS ENTIRE 'if(token)' BLOCK >>>
    if(token){
        try {
            await axios.post(url + "/api/cart/remove", // This is your remove endpoint
                { itemId },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Send the user's login token
                    },
                }
            );
        } catch (error) {
            console.error("Error removing from cart (frontend):", error);
            // You can add more detailed error logging here if needed
        }
    }
}
// ... (rest of your context provider)
const getTotalCartAmount = () =>{
  let totalAmount = 0;
  for(const item in cartItems)
  {
    if(cartItems[item]>0){
      let itemInfo = food_list.find ((product)=>product._id ===item)
    totalAmount += itemInfo.price* cartItems[item];
    }
    
  }
  return totalAmount;
}

const fetchFoodList = async () =>{
  const response = await axios.get(url + "/api/food/list");
  setFoodList(response.data.data);
}
// Example in StoreContext.jsx (simplified)
const loadCartData = async () => {
  try {
    if (!token) {
      console.log("No token found, user might not be logged in.");
      return;
    }

    const response = await axios.post(
   url+"/api/cart/get",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`, // ✅ Uses state token correctly
        },
      }
    );
    setCartItems(response.data.cartData);
  } catch (error) {
    console.error("Error loading cart data:", error);
    if (error.response && error.response.status === 401) {
      console.log("Unauthorized: User needs to log in.");
      localStorage.removeItem("token");
      // navigate('/login'); // Optional
    }
  }
};



useEffect(() => {
    const loadData = async () => {
      await fetchFoodList();
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
       
      }
    };
    loadData();
  }, []);

  useEffect(() => {
  if (token) {
    loadCartData();
  }
}, [token]);


  const contextValue ={
     food_list,
     cartItems,
     setCartItems,
     addToCart,
     removeFromCart,
     getTotalCartAmount,
     url,
     token,
     setToken
  }
  return(
    <StoreContext.Provider value ={contextValue}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoreContextProvider
