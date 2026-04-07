const router = require("express").Router();

const adminController = require("../controllers/adminController");


// dashboard summary
router.get("/dashboard", adminController.getDashboard);


// all customers
router.get("/customers", adminController.getCustomers);


// all orders
router.get("/orders", adminController.getOrders);


// low stock items
router.get("/low-stock", adminController.getLowStockProducts);


// add product
router.post("/add-product", adminController.addProduct);


// update stock
router.put("/update-stock", adminController.updateStock);


// delete product
router.delete("/delete-product/:id", adminController.deleteProduct);


module.exports = router;