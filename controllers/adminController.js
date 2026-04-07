const db = require("../config/db");


// Dashboard summary
exports.getDashboard = (req,res)=>{

// total products
db.query("SELECT COUNT(*) AS totalProducts FROM products",(err,productResult)=>{

if(err) return res.send(err);

// total orders
db.query("SELECT COUNT(*) AS totalOrders FROM orders",(err,orderResult)=>{

if(err) return res.send(err);

// low stock products
db.query("SELECT COUNT(*) AS lowStock FROM products WHERE stock < 5",(err,stockResult)=>{

if(err) return res.send(err);

res.json({

totalProducts: productResult[0].totalProducts,

totalOrders: orderResult[0].totalOrders,

lowStock: stockResult[0].lowStock

});

});

});

});

};




// Get all customers
exports.getCustomers = (req,res)=>{

db.query(

"SELECT id,name,email,role FROM users WHERE role='customer'",

(err,result)=>{

if(err) return res.send(err);

res.json(result);

}

);

};




// Get all orders
exports.getOrders = (req,res)=>{

db.query(

`SELECT orders.id, users.name, orders.total_price, orders.order_time

FROM orders

JOIN users ON orders.user_id = users.id`,

(err,result)=>{

if(err) return res.send(err);

res.json(result);

}

);

};




// Get low stock products
exports.getLowStockProducts = (req,res)=>{

db.query(

"SELECT * FROM products WHERE stock < 5",

(err,result)=>{

if(err) return res.send(err);

res.json(result);

}

);

};




// Add new product
exports.addProduct = (req,res)=>{

const {name,category,price,stock,image} = req.body;

db.query(

"INSERT INTO products(name,category,price,stock,image) VALUES (?,?,?,?,?)",

[name,category,price,stock,image],

(err,result)=>{

if(err) return res.send(err);

res.send("Product added successfully");

}

);

};




// Update product stock
exports.updateStock = (req,res)=>{

const {id,stock} = req.body;

db.query(

"UPDATE products SET stock=? WHERE id=?",

[stock,id],

(err,result)=>{

if(err) return res.send(err);

res.send("Stock updated");

}

);

};




// Delete product
exports.deleteProduct = (req,res)=>{

const id = req.params.id;

db.query(

"DELETE FROM products WHERE id=?",

[id],

(err,result)=>{

if(err) return res.send(err);

res.send("Product deleted");

}

);

};