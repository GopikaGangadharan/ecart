//import cartitems collection/models
const cartitems = require('../models/cartSchema')

//to add items to cart
exports.addToCart = async(req,res)=>{
    //to get product details from request body
    const{id,title,image,price,quantity} = req.body
    //logic
    try{
//check product is alredy in cart collection
const product = await cartitems.findOne({id})
if(product){
    //products is in cart
    //increment product Quantity
    product.quantity += 1
    //update total price for the product
    product.grantTotal = product.price * product.quantity
    //to save changes in monogdb
    product.save()
    //send res to client
    res.status(200).json("Items added to your cart....")
}
else{
    //products is not in the cart
    //add product to cart collection
    const  newProduct = new cartitems ({
      id,title,price,image,quantity,grantTotal:price  
    })
    //to save new product in mongodb
    await newProduct.save()
    //send res to client
    res.status(200).json("item added to your cart.......")
}
    }
    catch (error){
    res.status(401).json(error)
    }
}

//getCartItems
 exports.getCartItems = async (req,res)=>{
    //get all cart items from cart collections
//     //logic
    try{
    const allItems = await cartitems.find()
    //send allproducts to client
    res.status(200).json(allItems)
    }
    catch (error){
      res.status(401).json(error)
     }
 }

 //removeanitem from cart
exports.removeCartItem = async (req,res)=>{
        //get id of product should be removed
         const {id} = req.params

         //logic
        try{
            const removeItem = await cartitems.deleteOne({id})
            if(removeItem){
                //get remaining item other than the deleted one from cart
                const allItems = await cartitems.find()
                res.status(200).json(allItems)
            }
            else{
                res.status(404).json("item is not in the cart")
            }
        }
        catch(error){
                 res.status(401).json(error)
        }
}

//empty cart
exports.emptyCart = async (req,res)=>{
    try{
       const items = await cartitems.deleteMany({})
       res.status(200).json("your cart is empty")
    }
    catch(error){
      res.status(401).json(error)
    }
}

//incremnt quantity
exports.incrementQuantity = async(req,res)=>{
    //to get product id from req
    const {id} = req.params
    try{
 const product = await cartitems.findOne({id})
 if(product){
    //updating quantity and grandtotal
    product.quantity += 1
    product.grantTotal = product.price*product.quantity
    //to save change in mongodb
    await product.save()

    const allItems = await cartitems.find()
    res.status(200).json(allItems)
 }
 else{
    res.status(404).json("product is not in your cart...")
 }
    }
    catch(error){
        res.status(401).json(error)
    }

    
}

//decrement quantity
exports.decrementQuantity = async(req,res)=>{
    //to get product from req
    const {id} = req.params
    try{
     const product = await cartitems.findOne({id})
     if(product){
        //update quantity
        product.quantity-=1
        //check quantity =0
        if(product.quantity===0){
            //remove product from cart
            await cartitems.deleteOne({id})
            //get all cart 
            const allItems = await cartitems.find()
            res.status(200).json(allItems)
        }
        else{
            product.grantTotal = product.price*product.quantity
    //to save change in mongodb
    await product.save()

    const allItems = await cartitems.find()
    res.status(200).json(allItems)
        }
     }
     else{
        res.status(404).json("products not in your cart")
     }
    }
    catch(error){
        res.status(401).json(error)
    }
}

