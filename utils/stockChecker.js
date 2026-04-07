exports.checkStock=(product)=>{

if(product.stock<5){

console.log("Low stock alert:",product.name);

}

};