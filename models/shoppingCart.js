const mongoose = require("mongoose")

const shoppingCart = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    items: {
        type: Object,
        required: true
    },
    Total: {
        type: String,
        required: true
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    
}, {timestamps: true});

module.exports = mongoose.model('shoppingCart',shoppingCart)