const db = require("../config/db");


/* PLACE ORDER */

exports.placeOrder = (req, res) => {

const { user_id, items, total_price, payment_method } = req.body;


/* VALIDATION FIRST (IMPORTANT) */

if(!user_id){

return res.status(400).json({

success:false,
message:"User not logged in"

});

}


if(!items || items.length === 0){

return res.status(400).json({

success:false,
message:"Cart is empty"

});

}


if(!total_price){

return res.status(400).json({

success:false,
message:"Invalid total price"

});

}


/* INSERT ORDER */

const orderSql = `
INSERT INTO orders
(user_id,total_price,payment_method)
VALUES (?,?,?)
`;


db.query(

orderSql,
[user_id,total_price,payment_method || "COD"],

(err,result)=>{

if(err){

console.log("Order insert error:", err);

return res.status(500).json({

success:false,
message:"Order failed"

});

}


const orderId = result.insertId;


/* INSERT ORDER ITEMS */

const itemSql = `
INSERT INTO order_items
(order_id,product_id,quantity,price)
VALUES ?
`;


const values = items.map(item => [

orderId,
item.id,
item.quantity,
item.price

]);


db.query(itemSql,[values],(err2)=>{

if(err2){

console.log("Items insert error:", err2);

return res.status(500).json({

success:false,
message:"Items failed"

});

}


return res.status(200).json({

success:true,
message:"Order placed successfully",
orderId: orderId

});

});

});

};





/* GET ALL ORDERS (ADMIN PANEL) */

exports.getOrders = (req,res)=>{

const sql = `
SELECT *
FROM orders
ORDER BY id DESC
`;


db.query(sql,(err,result)=>{

if(err){

console.log(err);

return res.status(500).json([]);

}


res.json(result);

});

};





/* GET LOGGED-IN USER ORDERS */

exports.getUserOrders = (req,res)=>{


const userId = req.params.userId;


/* FETCH ORDERS WITH PRODUCTS */

const sql = `
SELECT 

o.id AS order_id,
o.total_price,
o.payment_method,
o.order_time,

p.name,
p.image,

oi.quantity,
oi.price

FROM orders o

LEFT JOIN order_items oi
ON o.id = oi.order_id

LEFT JOIN products p
ON oi.product_id = p.id

WHERE o.user_id = ?

ORDER BY o.id DESC
`;


db.query(sql,[userId],(err,result)=>{

if(err){

console.log(err);

return res.status(500).json([]);

}


/* GROUP ITEMS BY ORDER */

let orders = {};


result.forEach(row=>{


if(!orders[row.order_id]){

orders[row.order_id] = {

id: row.order_id,
total: row.total_price,
payment: row.payment_method,
time: row.order_time,

items: []

};

}


if(row.name){

orders[row.order_id].items.push({

name: row.name,
image: row.image,
qty: row.quantity,
price: row.price

});

}

});


res.json(Object.values(orders));

});

};