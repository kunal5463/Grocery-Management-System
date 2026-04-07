const router = require("express").Router();

const orderController =
require("../controllers/orderController");


// PLACE ORDER
router.post(
"/",
orderController.placeOrder
);


// ADMIN - GET ALL ORDERS
router.get(
"/",
orderController.getOrders
);


// USER ORDER HISTORY
router.get(
"/user/:userId",
orderController.getUserOrders
);


module.exports = router;