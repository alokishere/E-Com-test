const express = require("express");
const app = express();
const Router = require("./routes/auth.routes");
const cors = require("cors");
app.use(express.json());
const connectDB = require("./db/db");   


connectDB();
app.use(cors());

app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/auth", Router);

module.exports = app;