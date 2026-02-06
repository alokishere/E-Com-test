require("dotenv").config();
const express= require("express");
const app = express();
const connectDB = require("./src/db/db");
const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/product.routes");
const cartRoutes = require("./src/routes/cart.routes");
const cors = require("cors");
//port 
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());
app.use(cors());

//db connection
connectDB();


//routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.use("/api/cart", cartRoutes);



app.get('/', (req, res)=>{
    res.send("Hello World");
})

//server start
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

