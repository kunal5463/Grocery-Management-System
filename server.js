const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const orderRoutes = require("./routes/orderRoutes");
require("dotenv").config();

const app = express();

app.use(express.json());

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("views/user"));
app.use(express.static("public"));
app.use("/views", express.static("views"));
app.get("/", (req,res)=>{
res.sendFile(__dirname + "/views/user/login.html");
});

app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/products", require("./routes/productRoutes"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

app.listen(5000, ()=>{
console.log("Server running on port 5000");
});