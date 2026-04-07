const db=require("../config/db");

exports.getProducts=(callback)=>{
db.query("SELECT * FROM products",callback);
};

exports.addProduct=(data,callback)=>{
db.query(
"INSERT INTO products(name,category,price,stock,image) VALUES (?,?,?,?,?)",
[data.name,data.category,data.price,data.stock,data.image],
callback
);
};