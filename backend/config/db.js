import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose.connect('mongodb+srv://Projects:webdev307022@cluster0.7uxgur5.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
    .then(() => console.log("DB Connected"))
    .catch((err) => { // Added error handling for better debugging
      console.error("DB Connection Error:", err);
    });
}