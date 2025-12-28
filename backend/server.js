const express = require("express"); //packages
const cors = require("cors"); 
const dotenv = require("dotenv")//environment variable to hold the port
const connectDB = require("./config/db")
const userRoutes = require("./routes/userRoutes")
const productRoutes = require("./routes/productRoutes")
const cartRoutes = require("./routes/cartRoutes")
const checkoutRoutes = require("./routes/checkoutRoutes")
const orderRoutes = require("./routes/orderRoutes")
const uploadRoutes = require("./routes/uploadRoutes")
const subscriberRoute = require('./routes/subscriberRoute')
const adminRoutes = require("./routes/adminRoutes")
const productAdminRoutes = require("./routes/productAdminRoutes")
const adminOrderRoutes = require("./routes/adminOrderRoutes")

const app = express(); //initialize express app
app.use(express.json()); //server with able to work with json
app.use(cors({
    origin: "https://new-rabbit-wfnd.vercel.app",
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true
})); //to communicate with react server
app.use(express.json());
dotenv.config();

// console.log(process.env.PORT);

const PORT = process.env.PORT || 3000;

//connect to MongoDB
connectDB();


//basic route to test the server
app.get("/", (req,res) => {
    res.send("Welcome to Rabbit API!");
});

//API routes
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/checkout", checkoutRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api", subscriberRoute); 

//Admin
app.use("/api/admin/users", adminRoutes);
app.use("/api/admin/products", productAdminRoutes);
app.use("/api/admin/orders", adminOrderRoutes);

// app.listen(PORT, () => {
//     console.log(`Server is running on http://localhost:${PORT}`)
// })
module.exports = app;

