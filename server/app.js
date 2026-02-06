require("dotenv").config();
const express= require("express");
const app = express();
const connectDB = require("./src/db/db");
const authRoutes = require("./src/routes/auth.routes");
const productRoutes = require("./src/routes/product.routes");

//port 
const PORT = process.env.PORT || 3000;

//middleware
app.use(express.json());

//db connection
connectDB();


//routes
app.use("/api/auth", authRoutes);
app.use("/api/product", productRoutes);
app.get('/', (req, res)=>{
    res.send("Hello World");
})

//server start
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});

