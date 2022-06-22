const mongoose = require("mongoose")
const AssetSchema = new mongoose.Schema({
    userId: {
     type: mongoose.Schema.Types.ObjectId,
     required:true
    },
    name:{
        type:String,
        required:true
    },
    description:{
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    category : {
        type: String,
        required: true
    },
    date: {
        type:Date,
        default:Date.now
        // Year-month-day format
    }
})
const Asset = mongoose.model("asset", AssetSchema)
module.exports = Asset