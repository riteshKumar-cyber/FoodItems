import foodModel from "../models/foodModel.js";
import fs from "fs";



//add food item

const addFood = async (req,res) =>{
  // let image_filename = req.file?.filename;
  console.log("FILE:", req.file);
  if (!req.file || !req.file.filename) {
    return res.status(400).json({
      success: false,
      message: "Image file is missing. Make sure 'image' field is sent as File.",
    });
  }
const food = new foodModel({
     name:req.body.name,
     description:req.body.description,
     price:req.body.price,
     category:req.body.category,
     image:req.file.filename

});
try{
  await food.save();
  res.json({success:true,message:"Food Added",data:food});

} catch (error){
 console.log(error);
 res.json({success:false,
  message:"Error",
  error:error,
  food:food
});
}

}
//all food  list
const listFood = async (req,res) => {
try{
  const foods = await foodModel.find ({});
res.json({success:true,data:foods})
}catch(error){
console.log(error);
 res.json({success:false,
  message:"Error",
  error:error,
  food:food
});
}}



//remove food item
 const removeFood = async (req,res) =>{
try{
  const food = await foodModel.findById(req.body.id);
if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

  fs.unlink(`uploads/${food.image}`,(err)=>{
    if (err) {
        console.error("Error deleting image:", err);
      }
  })

  await foodModel.findByIdAndDelete(req.body.id);
  res.json({success:true,message:"Food Removed"})
}catch (error){
console.log(error);
 res.json({success:false,
  message:"Error",
  error:error.message,
  
});
}
}

export {addFood,listFood,removeFood};