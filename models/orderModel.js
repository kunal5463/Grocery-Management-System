const db=require("../config/db");

exports.createOrder=(data,callback)=>{
db.query(
"INSERT INTO orders(user_id,total_price) VALUES (?,?)",
[data.user_id,data.total_price],
callback
);
};