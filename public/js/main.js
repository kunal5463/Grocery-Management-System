fetch("/api/products")

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(p=>{

html+=`

<div>

<h3>${p.name}</h3>

<p>₹${p.price}</p>

<p>Stock:${p.stock}</p>

</div>

`;

});

document.getElementById("products").innerHTML=html;

});