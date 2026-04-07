const db=require("../config/db");

exports.createUser=(data,callback)=>{
db.query(
"INSERT INTO users(name,email,password,role) VALUES (?,?,?,?)",
[data.name,data.email,data.password,data.role],
callback
);
};