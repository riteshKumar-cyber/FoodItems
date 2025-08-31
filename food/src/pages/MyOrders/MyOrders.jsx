import React, { useContext, useState, useEffect } from 'react';
import './MyOrders.css';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';
import { assets } from '../../assets/assets';

const MyOrders = () => {
  const { url, token } = useContext(StoreContext);
  const [data, setData] = useState([]);

  const fetchOrders = async () => {
    try {
      const response = await axios.post(
        `${url}/api/order/userOrders`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setData(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error('Error fetching orders:', error.response?.data || error.message);
    }
  };

 useEffect(() => {
  console.log("Token:", token); // ✅ DEBUG
  if (token) {
    fetchOrders();
  }
}, [token]);


  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      <div className="container">
        {data.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          data.map((order, index) => (
           <div key={index} className="my-orders-order">
  <img src={assets.parcel_icon} alt="Order Parcel Icon" />
  <p>
    {order.items
      ?.map((item) => `${item.itemId?.name} x${item.quantity}`)
      .join(', ')}
  </p>
  <p>${order.amount}.00</p>
  <p>Items:{order.items.length}</p>
  <p><span>&#x25cf;</span><b>{order.status}</b></p>
  <button onClick={fetchOrders}>Track Order</button>
</div>

          ))
        )}
      </div>
    </div>
  );
};

export default MyOrders;
