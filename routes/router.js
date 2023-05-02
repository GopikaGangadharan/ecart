//import express
const express = require('express')

//Router()
const router = new express.Router()

//import productControllers
const productController = require('../controllers/productController')

//import wishlistController
const wishlistController = require('../controllers/wishlistController')

//cartController import
const cartController = require('../controllers/cartController')

//get all products api
//router.http-request(path,callback to define logic to resolve api)
router.get('/products/get-all-products',productController.getallproducts)

//router for view single product details
//collon is given to know path parameter to server
router.get('/products/:id',productController.viewProduct)

//route for add to wishlist 
router.post('/products/add-to-wishlist',wishlistController.addToWishlist)

//route for get all wishlist tems
router.get('/wishlist/get-all-items',wishlistController.getAllWishlistItems)

//route for removing an item from wishlist
router.delete('/wishlist/remove-item/:id',wishlistController.removeWishlistItem)

//route for adding item to cart
router.post('/products/add-to-cart',cartController.addToCart)

//route for get all cart items
router.get('/cart/get-all-items',cartController.getCartItems)

//route for removing an item from cart
router.delete('/cart/remove-item/:id',cartController.removeCartItem)

//route for empty cart
router.delete('/cart/remove-all-item',cartController.emptyCart)

//increment cart items
router.get('/cart/increment-item/:id',cartController.incrementQuantity)

//decrement cart items
router.get('/cart/decrement-item/:id',cartController.decrementQuantity)

//exports
module.exports = router