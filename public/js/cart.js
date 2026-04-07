// LOAD CART FROM LOCALSTORAGE
let cart = JSON.parse(localStorage.getItem("cart")) || [];


// ADD PRODUCT TO CART
function addToCart(id, name, price, image) {

let found = false;

for (let i = 0; i < cart.length; i++) {

if (cart[i].id == id) {

cart[i].quantity++;

found = true;

}

}

if (!found) {

cart.push({

id: id,
name: name,
price: Number(price),
image: image,
quantity: 1

});

}


// SAVE CART
saveCart();


// UPDATE NAVBAR COUNT
updateCartCount();


// OPTIONAL MESSAGE
alert(name + " added to cart");

}




// SAVE CART FUNCTION
function saveCart() {

localStorage.setItem("cart", JSON.stringify(cart));

}




// LOAD CART PAGE
function loadCart() {

let html = "";

let total = 0;


// IF CART EMPTY
if (cart.length === 0) {

document.getElementById("cartTable").innerHTML = `
<tr>
<td colspan="5" style="text-align:center;padding:20px;">
Cart is empty 🛒
</td>
</tr>
`;

document.getElementById("totalPrice").innerText = "0";

updateCartCount();

return;

}


cart.forEach((item, index) => {

let itemTotal = item.price * item.quantity;

total += itemTotal;

html += `

<tr>

<td>
<img src="${item.image}" width="40">
${item.name}
</td>

<td>₹${item.price}</td>

<td>

<button onclick="decreaseQty(${index})">-</button>

${item.quantity}

<button onclick="increaseQty(${index})">+</button>

</td>

<td>₹${itemTotal}</td>

<td>

<button onclick="removeItem(${index})">
Remove
</button>

</td>

</tr>

`;

});


document.getElementById("cartTable").innerHTML = html;

document.getElementById("totalPrice").innerText = total;


// UPDATE NAVBAR CART COUNT
updateCartCount();

}




// INCREASE QUANTITY
function increaseQty(index) {

cart[index].quantity++;

saveCart();

loadCart();

}




// DECREASE QUANTITY
function decreaseQty(index) {

if (cart[index].quantity > 1) {

cart[index].quantity--;

} else {

removeItem(index);

return;

}

saveCart();

loadCart();

}




// REMOVE ITEM
function removeItem(index) {

cart.splice(index, 1);

saveCart();

loadCart();

}




// UPDATE NAVBAR CART COUNT
function updateCartCount() {

let storedCart = JSON.parse(localStorage.getItem("cart")) || [];

let count = 0;

storedCart.forEach(item => {

count += item.quantity;

});


let cartCountElement =
document.getElementById("cartCount");

if (cartCountElement) {

cartCountElement.innerText = count;

}

}





// PLACE ORDER
function placeOrder(){

let userId = localStorage.getItem("userId");

console.log("STEP 1 userId:", userId);

if(!userId){

alert("Please login first");

return;

}

if(cart.length===0){

alert("Cart empty");

return;

}

let paymentMethod =
document.getElementById("paymentMethod").value || "COD";

let total = 0;

cart.forEach(item=>{
total += item.price * item.quantity;
});

console.log("STEP 2 sending data:", {

user_id:userId,
items:cart,
total_price:total,
payment_method:paymentMethod

});


fetch("/api/orders",{

method:"POST",

headers:{
"Content-Type":"application/json"
},

body:JSON.stringify({

user_id:Number(userId),
items:cart,
total_price:total,
payment_method:paymentMethod

})

})

.then(res=>{

console.log("STEP 3 response status:", res.status);

return res.text();

})

.then(text=>{

console.log("STEP 4 raw response:", text);

document.getElementById("orderMessage").innerHTML =
"Order placed successfully! Redirecting...";

setTimeout(()=>{

window.location.href="index.html";

},1200);

})

.catch(err=>{

console.log("STEP 5 ERROR:", err);

alert("Server error");

});

}



// RUN ON PAGE LOAD
updateCartCount();