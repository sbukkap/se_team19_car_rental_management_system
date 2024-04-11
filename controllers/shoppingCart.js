const {StatusCodes} = require("http-status-codes")
const shoppingCart = require("../models/shoppingCart")
const jwt = require('jsonwebtoken');


const isShoppingCartPresent = async (req, res) => {
    // console.log(req.params)
    const user = req.params.userId;
    const shoppingCartUser = await shoppingCart.find({ user_id: user, isDeleted: true });
    // console.log(shoppingCartUser.length)
    if (shoppingCartUser.length === 0) {
        console.log('no cart')
        res.status(StatusCodes.OK).json({ message: "No shopping cart", data: { shoppingCart: false }, status_code: StatusCodes.OK });
    } else {
        console.log('present')
        res.status(StatusCodes.OK).json({ message: "Shopping cart present", data: { shoppingCart: true, id: shoppingCartUser._id }, status_code: StatusCodes.OK });
    }
}



const createShoppingcart = async(req, res)=>{
    console.log(req.body)
    const shoppingCart_doc = await shoppingCart.create(req.body)
    res.status(StatusCodes.CREATED).json({message:"success", data: shoppingCart_doc, status_code:StatusCodes.CREATED})
}

const get_Shoppingcart = async(req, res)=>{
    // console.log(req.params)
    // const decodedToken = jwt.decode(req.params.userId);
    // const userId = decodedToken.userId;
    const shoppingcartUser = await shoppingCart.find({ user_id: req.params.userId, isDeleted: true })
    // console.log(shoppingCart)
    if (! shoppingcartUser){
        res.status(StatusCodes.OK).json({message:"no shopping cart", data:{}, status_code:StatusCodes.OK})
    }
    res.status(StatusCodes.OK).json({message:"success", data:shoppingcartUser, status_code:StatusCodes.OK})
}

// const updateShoppingcart = async(req, res)=>{
//     // const decodedToken = jwt.decode(req.params.userId);
//     // const userId = decodedToken.userId;
//     const shoppingCartId = req.params.userId
//     const shoppingCartUpdate = req.body
//     console.log(shoppingCartUpdate)
//     if (!req.body){
//         res.status(StatusCodes.BAD_REQUEST).json({message:"provide valid update paramerters", data: {}, status_code:StatusCodes.BAD_REQUEST})
//     }
//     const shoppingCartUpdated = await shoppingCart.findOneAndUpdate({ user_id:shoppingCartId}, shoppingCartUpdate, {new:true, runValidators:true })
//     res.status(StatusCodes.OK).json({message:"update Succesful", data: shoppingCartUpdated, status_code:StatusCodes.OK})
// }

// const updateShoppingcart = async (req, res) => {
//     const shoppingCartId = req.params.userId;
    
//     if (!newItem) {
//         return res.status(StatusCodes.BAD_REQUEST).json({ message: "Provide a valid item to add", data: {}, status_code: StatusCodes.BAD_REQUEST });
//     }
    
//     try {
//         const shoppingCartUpdated = await shoppingCart.findOneAndUpdate(
//             { user_id: shoppingCartId }, // Find the shopping cart by user_id
//             { $push: { items: newItem } }, // Add the new item to the items array using $push
//             { new: true, runValidators: true }
//         );
        
//         res.status(StatusCodes.OK).json({ message: "Item added to shopping cart", data: shoppingCartUpdated, status_code: StatusCodes.OK });
//     } catch (error) {
//         console.error('Error updating shopping cart:', error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating shopping cart", data: {}, status_code: StatusCodes.INTERNAL_SERVER_ERROR });
//     }
// };

// const updateShoppingcart = async(req, res)=>{
//     try {
//         const userId = req.params.userId;
//         const shoppingCartUpdate = req.body;
//         if (!shoppingCartUpdate.items) {
//             throw new Error('No items provided for update');
//         }
//         // Update the shopping cart with the new items array
//         // console.log(shoppingCartUpdate.items)
//         const shoppingCartUpdated = await shoppingCart.findOneAndUpdate({ user_id: userId }, { items: shoppingCartUpdate.items }, { new: true, runValidators: true });
//         res.status(StatusCodes.OK).json({ message: "Update successful", data: shoppingCartUpdated, status_code: StatusCodes.OK });
//     } catch (error) {
//         console.error('Error updating shopping cart:', error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating shopping cart", data: {}, status_code: StatusCodes.INTERNAL_SERVER_ERROR });
//     }
// };


// const updateShoppingcart = async (req, res) => {
//     try {
//         const userId = req.params.userId;
//         const shoppingCartUpdate = req.body;
//         if (!shoppingCartUpdate.items) {
//             throw new Error('No items provided for update');
//         }

//         // Create a new instance of the ShoppingCart model
//         const newShoppingCart = new shoppingCart({
//             user_id: userId,
//             items: shoppingCartUpdate.items
//             // Add other fields if necessary
//         });

//         // Save the new shopping cart document to the database
//         const shoppingCartSaved = await newShoppingCart.save();

//         // Return the newly saved document as response
//         res.status(StatusCodes.OK).json({ message: "Insert successful", data: shoppingCartSaved, status_code: StatusCodes.OK });
//     } catch (error) {
//         console.error('Error inserting shopping cart:', error);
//         res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error inserting shopping cart", data: {}, status_code: StatusCodes.INTERNAL_SERVER_ERROR });
//     }
// };

const updateShoppingcart = async (req, res) => {
    try {
        const userId = req.params.userId;
        const shoppingCartUpdate = req.body;
        if (!shoppingCartUpdate.items) {
            throw new Error('No items provided for update');
        }

        const ShoppingCart = await shoppingCart.findOneAndUpdate(
            { user_id: userId }, // Query: Find document with user_id
            { $push: { items: { $each: shoppingCartUpdate.items } } }, // Update: Push each item to items array
            { new: true, runValidators: true } // Options: Return updated document
        );

        // Check if shopping cart document exists
        if (!ShoppingCart) {
            // If shopping cart document doesn't exist, handle the case (e.g., return 404)
            res.status(StatusCodes.NOT_FOUND).json({ message: "Shopping cart not found for user", data: {}, status_code: StatusCodes.NOT_FOUND });
            return;
        }

        // Return the updated document as response
        res.status(StatusCodes.OK).json({ message: "Update successful", data: ShoppingCart, status_code: StatusCodes.OK });
    } catch (error) {
        console.error('Error updating shopping cart:', error);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ message: "Error updating shopping cart", data: {}, status_code: StatusCodes.INTERNAL_SERVER_ERROR });
    }
};


const deleteItemShoppingcart = async(req, res)=>{
    const shoppingCartDelete = await shoppingCart.findOneAndUpdate({_id:req.params.userId}, {isDeleted:true}, {new:true, runValidators:true})
    if (!shoppingCartDelete){
        res.status(StatusCodes.NOT_FOUND).json({message:"NO shoppingcart", data: shoppingCartDelete, status_code:StatusCodes.NOT_FOUND})
    }
    res.status(StatusCodes.OK).json({message:"Shopping cart deleted", data: shoppingCartDelete, status_code:StatusCodes.OK})
}

const deleteUserShoppingCart = async(req, res)=>{
    
}

module.exports = {isShoppingCartPresent , createShoppingcart, get_Shoppingcart, updateShoppingcart, deleteItemShoppingcart}