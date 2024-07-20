    const mongoose = require('mongoose')
    const Schema = mongoose.Schema

    const cartItemSchema = new Schema({
        item: {
            type: Schema.Types.Mixed,
            ref: 'Inventory'
        },
        count: {
            type: Number,
            default: 1
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'UserName'
        }
    })

    module.exports = mongoose.model("CartItem", cartItemSchema)