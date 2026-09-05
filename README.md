# 🍔 Food Delivery Website

A full-stack **Food Delivery Web Application** built using the **MERN Stack (MongoDB, Express.js, React.js, Node.js)**. The application allows users to browse food items, add products to cart, place orders, and manage their food orders through a simple and responsive interface.

## 🚀 Live Demo

**Frontend:**
https://food-fronted-kb45.onrender.com

**GitHub:**
https://github.com/riteshKumar-cyber

---

## 📌 Project Overview

The Food Delivery Website is designed to provide an easy and convenient platform for users to order food online.

Users can:

* Browse available food items
* View food details and prices
* Add food items to the cart
* Increase or decrease item quantity
* Remove items from the cart
* Place food orders
* Manage their account
* View their orders

The project uses a **React.js frontend** and a **Node.js/Express.js backend**, with **MongoDB** used for storing application data.

---

## ✨ Features

### 👤 User Features

* User Registration and Login
* Secure User Authentication
* Browse Food Items
* Search/Browse Food
* Food Details
* Add to Cart
* Update Cart Quantity
* Remove Items from Cart
* Order Placement
* Order Management
* Responsive UI

### 🛒 Cart Features

* Add food items to cart
* Increase/decrease quantity
* Remove products
* Calculate total amount
* Display selected items before checkout

### 📦 Order Features

* Place food orders
* Store order information
* View order details
* Track/manage orders

---

## 🛠️ Technologies Used

### Frontend

* React.js
* JavaScript
* HTML5
* CSS3
* Vite
* Axios

### Backend

* Node.js
* Express.js
* REST API
* CORS
* dotenv

### Database

* MongoDB
* MongoDB Atlas
* Mongoose

### Tools

* Git & GitHub
* Postman
* VS Code
* Render

---

## 🏗️ Project Architecture

```text
Food Delivery Website
│
├── Frontend
│   ├── React.js
│   ├── Components
│   ├── Pages
│   ├── Cart
│   └── API Integration
│
├── Backend
│   ├── Node.js
│   ├── Express.js
│   ├── Routes
│   ├── Controllers
│   └── Middleware
│
└── Database
    └── MongoDB Atlas
```

---

## 📂 Project Structure

```text
food-delivery/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── ...
│
├── backend/
│   ├── routes/
│   ├── models/
│   ├── controllers/
│   ├── server.js
│   ├── package.json
│   └── ...
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/riteshKumar-cyber/food-delivery.git
```

### 2. Go to the Project Directory

```bash
cd food-delivery
```

### 3. Install Frontend Dependencies

```bash
cd frontend
npm install
```

### 4. Install Backend Dependencies

Open another terminal:

```bash
cd backend
npm install
```

### 5. Configure Environment Variables

Create a `.env` file inside the backend folder.

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Add any other environment variables required by your project.

### 6. Start Backend

```bash
npm start
```

or, if using nodemon:

```bash
npm run dev
```

### 7. Start Frontend

```bash
cd frontend
npm run dev
```

The application will then be available on the local development server shown by Vite.

---

## 🔄 How the Application Works

```text
User
  ↓
React.js Frontend
  ↓
REST API
  ↓
Node.js + Express.js Backend
  ↓
MongoDB Database
  ↓
Response
  ↓
React.js UI
```

1. User opens the food delivery website.
2. User browses available food items.
3. User selects food and adds it to the cart.
4. Cart calculates the selected items and total amount.
5. User proceeds to place an order.
6. Frontend sends the request to the backend API.
7. Backend processes the request.
8. Order information is stored in MongoDB.
9. The response is displayed to the user.

---

## 🔐 Security

The project follows basic web application security practices such as:

* Environment variables for sensitive configuration
* Backend API validation
* CORS configuration
* Authentication and authorization
* Database-level data management
* Separation of frontend and backend

**Note:** Never upload `.env` files, passwords, API keys, or database credentials to GitHub.

---

## 🌐 Deployment

The project is deployed online using **Render**.

### Live Project

https://food-fronted-kb45.onrender.com

The frontend communicates with the deployed backend through API requests.

---

## 📸 Project Screenshots

<img width="1913" height="871" alt="Screenshot 2026-09-03 222910" src="https://github.com/user-attachments/assets/705b86c0-eb2e-4e3d-949a-2d3ce7cbb237" />
<img width="1916" height="868" alt="Screenshot 2026-09-03 222925" src="https://github.com/user-attachments/assets/ef6e3124-9e6c-4daa-b53d-c9b3cbb78b05" />



```text
Home Page
Food Listing
Food Details
Cart
Checkout
Login/Register
Order Page
```

Example:

```markdown
![Home Page](screenshots/home.png)
![Food Listing](screenshots/food-list.png)
![Cart](screenshots/cart.png)
![Checkout](screenshots/checkout.png)
```

---

## 🎯 Future Scope

The project can be further improved by adding:

* Online Payment Gateway
* Live Order Tracking
* Google Maps Integration
* Restaurant/Admin Dashboard
* Delivery Partner Module
* Push Notifications
* Food Recommendation System using AI
* Rating and Review System
* Coupon and Discount System
* Order History and Analytics

---

## 📚 Learning Outcomes

Through this project, I gained practical experience in:

* MERN Stack Development
* React.js Component Development
* REST API Development
* Node.js and Express.js
* MongoDB Database Management
* Frontend-Backend Integration
* Authentication
* Git and GitHub
* API Testing using Postman
* Web Application Deployment

---

## 👨‍💻 Developer

**Ritesh Kumar**

B.Tech — Cyber Security
Poornima College of Engineering

### Skills

`HTML` `CSS` `JavaScript` `React.js` `Node.js` `Express.js` `MongoDB` `SQL` `Git` `GitHub`

---

## ⭐ Support

If you find this project useful, please consider giving the repository a ⭐ on GitHub.

---

## 📄 License

This project is developed for **educational and portfolio purposes**.
