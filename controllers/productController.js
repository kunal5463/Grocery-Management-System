const db=require("../config/db");

exports.getProducts=(req,res)=>{
db.query("SELECT * FROM products",(err,result)=>{
res.send(result);
});
};