import React, { useEffect, useState, useContext } from 'react';
import  './Order.css'
import axios from 'axios';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';

const Order = ({ url }) => {
  const [orders, setOrders] = useState([]);
  const { food_list } = useContext(StoreContext);

  const fetchAllOrders = async () => {
    try {
      const response = await axios.get(`${url}/api/order/list`);
      if (response.data.success) {
        setOrders(response.data.data);
        console.log("Fetched Orders:", response.data.data);
      } else {
        console.error('Failed to fetch orders');
      }
    } catch (error) {
      console.error('Server error while fetching orders:', error);
    }
  };


 const statusHandler = async (event, orderId) => {
  const newStatus = event.target.value;
console.log("Changed status for order:", orderId, "=>", newStatus);
  try {
    // Optionally update the backend
    await axios.post(`${url}/api/order/update-status`, { orderId, status: newStatus });

    // Update state locally
    setOrders(prev =>
      prev.map(order =>
        order._id === orderId ? { ...order, status: newStatus } : order
      )
    );
  } catch (err) {
    console.error("Failed to update status", err);
  }
};


  useEffect(() => {
    fetchAllOrders();
  }, []);

  return (
    <div className='order add'>
      <h3>Order Page</h3>
      <div className="order-list">
        {orders.map((order, index) => (
          <div key={index} className='order-item'>
  {/* COLUMN 1: Image */}
  <div>
    <img src={assets.parcel_icon} alt="" />
  </div>

  {/* COLUMN 2: Food items */}
  <div>
    <p className='order-item-food'>
      {order.items.map((item, index) => {
        const food = food_list.find(f => f._id === item.itemId);
        const name = food ? food.name : 'Unknown';
        return `${name}x${item.quantity}${index !== order.items.length - 1 ? ', ' : ''}`;
      })}
    </p>
    <div>
    <p className="order-item-name">
      {(order.address?.firstname || order.address?.firstName || '') + ' ' + (order.address?.lastName || order.address?.lastname || '')}
    </p>
    <div className='order-item-address'>
      <p>{order.address.street},</p>
      <p>{order.address.city}, {order.address.state}, {order.address.country}, {order.address.zipcode}</p>
    </div>
    <p className='order-item-phone'>{order.address.phone}</p>
  </div>
  </div>

  {/* COLUMN 3: User info */}
  

  {/* COLUMN 4: Quantity and Amount */}
  <div className='item'>
    <p>Items: {order.items.length}</p>
    <p>$ {order.amount}</p>
  </div>

  {/* COLUMN 5: Select Option */}
  <div>
   <select onChange={(event)=>statusHandler(event,order._id)} value={order.status}>

      <option value="Food Processing">Food Processing</option>
      <option value="Out For delivery">Out For delivery</option>
      <option value="Delivered">Delivered</option>
    </select>
  </div>
</div>

        ))}
      </div>
    </div>
  );
};

export default Order;
