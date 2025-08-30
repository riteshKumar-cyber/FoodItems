import React,{useState,useEffect} from 'react'
import './List.css'
import axios from 'axios';

import { toast } from 'react-toastify';


const List = ({url}) => {
  
  const [list,setList] = useState([]);
  const fetchList = async () => {
  try {
    const response = await axios.get(`${url}/api/food/list`);
    if (response.data.success) {
      setList(response.data.data);
    } else {
      toast.error("Failed to fetch food list.");
    }
  } catch (err) {
    toast.error("Server error: could not fetch food list.");
    console.error(err);
  }
};

const removeFood = async (foodId) => {
  try {
    const response = await axios.post(`${url}/api/food/remove`, { id: foodId });
    await fetchList(); // Refresh after deletion
    if (response.data.success) {
      toast.success(response.data.message || "Food removed successfully.");
    } else {
      toast.error(response.data.message || "Failed to remove food.");
    }
  } catch (err) {
    toast.error("Server error: could not remove food.");
    console.error(err);
  }
};

  
useEffect(()=>{
fetchList();
},[])


  return (
   <div className='list add flex-col'>
    <p>All Foods List</p>
    <div className="list-table">
      <div className="list-table-format title">
      <b>Image</b>
      <b>Name</b>
      <b>Category</b>
      <b>Price</b>
      <b>Action</b>
      </div>
      {list.map((item,index)=>{
        return(
          <div key={index} className='list-table-format'>
          <img src={`${url}/uploads/`+item.image} alt="" />
          <p>{item.name}</p>
          <p>{item.category}</p>
           <p>${item.price}</p>
           <p onClick={()=>removeFood(item._id)} className='cursor'>x</p>
          </div>


        )
      })}
    </div>
   </div>
  )
}

export default List
