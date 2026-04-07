const jwt = require("jsonwebtoken");


// verify login token
exports.verifyToken = (req,res,next)=>{

const token = req.headers["authorization"];

if(!token){

return res.status(403).send("Token required");

}

try{

const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = decoded;

next();

}

catch(error){

return res.status(401).send("Invalid token");

}

};



// check if admin
exports.isAdmin = (req,res,next)=>{

if(req.user.role !== "admin"){

return res.status(403).send("Admin access only");

}

next();

};



// check if customer
exports.isCustomer = (req,res,next)=>{

if(req.user.role !== "customer"){

return res.status(403).send("Customer access only");

}

next();

};