const mongoose = require("mongoose")

const Tickets = new mongoose.Schema(
{
    user_id: {
        type: String,
        required: true
    },
    item: {
        type: String,
        required: true
    },
    itemOwnerId:{
        type: String,
        required: true

    },
    comment: {
        type: String,
        required: true
    },
    resolveStatus: {
        type: Boolean,
        required: true
    },
    
}, {timestamps: true}

)

module.exports = mongoose.model('Tickets',Tickets)
