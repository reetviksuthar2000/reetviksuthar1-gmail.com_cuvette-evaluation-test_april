const express = require("express");
const router = express.Router();
const Product = require("../models/product");
const CartItem = require("../models/cartModal");


router.get("/list-products", async (req, res) => {
  try {
    const search = req.query.search;
    let type = req.query.type;
    let company = req.query.company;
    const price = req.query.price || "";
    let color = req.query.color;
    let sort = req.query.sort;

    const filterData = {};

    if (search) {
      filterData.$or = [{company : { $regex: search, $options: "i"}}]
    }

    if (type) {
      filterData.type = { $regex: type, $options: "i"}
    }

    if (company) {
      filterData.company = { $regex: company, $options: "i"}
    }

    if (color) {
    
      filterData.color = { $regex: color, $options: "i"}
    }

    if (price && price.length != 0) {
      //  filterData.price = {$eq: price }
      if(price == "0-1000") filterData.price = {$gt: 0, $lt: 1000 }
      else if(price == "1000-10000") filterData.price = {$gt: 1000, $lt: 10000 }
      else if(price == "10000-20000") filterData.price = {$gt: 10000, $lt: 20000 }
    }

    let apidata = Product.find(filterData);

    if(sort){
       apidata = apidata.sort(sort);

    }

    const filterProducts = await apidata;

    return res.status(200).json({
      products: filterProducts
    })

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

router.get("/get-products/:id", async (req, res) => {
  try {
    const _id = req.params.id;

    const productdetail = await Product.findById({ _id });

    return res.json({
      success: true,
      message: "get job succesfully for description page",
      data: productdetail,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, error: "internal server error" });
  }
});

router.get("/checkout", async (req,res) => {
  try {
    const productIds = req.query.productIds;
   
    const product = await Product.find({_id: {$in: productIds }});
    return res.status(200).json({
      product
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
})

router.post('/add_to_cart', async (req, res) => {
  try {
    const {userId, productId, quantity} = req.body;
    const existingCartItems = await CartItem.findOne({ userId, productId});
    if(existingCartItems){
      existingCartItems.quantity += quantity;
      await existingCartItems.save();
    }
    else{
      const newCartItems = new CartItem({userId, productId, quantity});
      await newCartItems.save();
    }
    return res.status(200).json({
      message: "product added in cart succcessfully"
    })
  } catch (error) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
})

router.get('/get_cart', async (req, res) => {
  try {
    const userId = req.params.userId;
    const cartItems = await CartItem.find(userId);
    
    const cartwithDetails = await Promise.all(cartItems.map(async (cartItem) => {

      const product = await Product.findById(cartItem.productId);
      
      return {
        _id: cartItem._id,
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        product: product,
      };
    
    }))

    return res.status(200).json(cartwithDetails);

  } catch (error) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
})

router.put('/modify_quantity', async (req, res) => {
  try {
    const {userId, productId, quantity } = req.body;

    const updateCartItem = await CartItem.findOneAndUpdate(
      {userId, productId},
      {quantity},
      {new : true }
    );
    if(!updateCartItem){
      return res.status(404).json({message: 'cart item not found'})
    }
    res.status(200).json(updateCartItem);

  } catch (error) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
})

router.delete('/:cartItemId', async (req, res) => {
  try {
    const cartItemIds = req.params.cartItemId.split(',');

    const cartItemObjectIdIds = cartItemIds.map((id) => new mongoose.Types.ObjectId(id));

    const result = await CartItem.deleteMany({ productId: { $in: cartItemObjectIdIds } });

  } catch (error) {
    res.status(500).json({ success: false, error: "internal server error" });
  }
})

router.delete('/:cartItemId', async (req, res) => {
  try {

      const cartItemIds = req.params.cartItemId.split(',');

      const cartObjectIds = cartItemIds.map((id) => new mongoose.Types.ObjectId(id));
      const deleteData = await CartItem.deleteMany({ productId: { $in: cartObjectIds } });

      if (deleteData.deletedCount === 0) {
          return res.status(404).json({ message: 'Cart items not found' });
      }

      res.status(200).json({ message: 'Cart items deleted successfully' });
  } catch (error) {
      console.error('Error deleting cart items:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
