const mongoose = require("mongoose")

const rentSchema = new mongoose.Schema({
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
    
}, {timestamps: true});

module.exports = mongoose.model('rentItems',rentSchema)