const API = "http://localhost:5000/api/admin";


// load dashboard summary
function loadDashboard(){

fetch(`${API}/dashboard`)

.then(res=>res.json())

.then(data=>{

document.getElementById("totalProducts").innerText = data.totalProducts;

document.getElementById("totalOrders").innerText = data.totalOrders;

document.getElementById("lowStock").innerText = data.lowStock;

});

}



// load all products
function loadProducts(){

fetch("http://localhost:5000/api/products")

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(p=>{

html+=`

<tr>

<td>${p.id}</td>

<td>${p.name}</td>

<td>${p.category}</td>

<td>${p.price}</td>

<td>${p.stock}</td>

<td>

<button onclick="deleteProduct(${p.id})">Delete</button>

</td>

</tr>

`;

});

document.getElementById("productTable").innerHTML = html;

});

}



// add new product
function addProduct(){

const name = document.getElementById("name").value;

const category = document.getElementById("category").value;

const price = document.getElementById("price").value;

const stock = document.getElementById("stock").value;

const image = document.getElementById("image").value;


fetch(`${API}/add-product`,{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

name,
category,
price,
stock,
image

})

})

.then(res=>res.text())

.then(msg=>{

alert(msg);

loadProducts();

});

}



// delete product
function deleteProduct(id){

fetch(`${API}/delete-product/${id}`,{

method:"DELETE"

})

.then(res=>res.text())

.then(msg=>{

alert(msg);

loadProducts();

});

}



// update stock
function updateStock(){

const id = document.getElementById("productId").value;

const stock = document.getElementById("newStock").value;


fetch(`${API}/update-stock`,{

method:"PUT",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

id,
stock

})

})

.then(res=>res.text())

.then(msg=>{

alert(msg);

loadProducts();

});

}



// load customers
function loadCustomers(){

fetch(`${API}/customers`)

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(c=>{

html+=`

<tr>

<td>${c.id}</td>

<td>${c.name}</td>

<td>${c.email}</td>

</tr>

`;

});

document.getElementById("customerTable").innerHTML = html;

});

}



// load orders
function loadOrders(){

fetch(`${API}/orders`)

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(o=>{

html+=`

<tr>

<td>${o.id}</td>

<td>${o.name}</td>

<td>₹${o.total_price}</td>

<td>${o.order_time}</td>

</tr>

`;

});

document.getElementById("orderTable").innerHTML = html;

});

}



// load low stock products
function loadLowStock(){

fetch(`${API}/low-stock`)

.then(res=>res.json())

.then(data=>{

let html="";

data.forEach(p=>{

html+=`

<li>${p.name} (Stock: ${p.stock})</li>

`;

});

document.getElementById("lowStockList").innerHTML = html;

});

}