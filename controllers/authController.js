const db = require("../config/db");

const bcrypt = require("bcryptjs");


/* REGISTER USER */

exports.register = async (req,res)=>{

try{

const {

name,
email,
password,
mobile,

address

} = req.body;


const hash = await bcrypt.hash(password,10);


db.query(

`INSERT INTO users
(name,email,password,mobile,building,street,landmark,city,pincode,role)

VALUES (?,?,?,?,?,?,?,?,?,?)`,

[

name,

email,

hash,

mobile,

address.building,

address.street,

address.landmark,

address.city,

address.pincode,

"customer"

],

(err,result)=>{


if(err){

console.log(err);

return res.send("Error registering user");

}


res.send("Registered successfully");

}

);


}

catch(err){

console.log(err);

res.send("Server error");

}

};



/* LOGIN USER */

exports.login = (req,res)=>{


const {email,password} = req.body;


db.query(

"SELECT * FROM users WHERE email=?",

[email],

async (err,result)=>{


if(err){

console.log(err);

return res.send("Error");

}


if(result.length==0){

return res.send("User not found");

}


const valid = await bcrypt.compare(

password,

result[0].password

);


if(!valid){

return res.send("Incorrect password");

}


/* send user data */

res.json({

id: result[0].id,

name: result[0].name,

email: result[0].email,

mobile: result[0].mobile,

address: {

building: result[0].building,

street: result[0].street,

landmark: result[0].landmark,

city: result[0].city,

pincode: result[0].pincode

},

role: result[0].role

});


}

);


};