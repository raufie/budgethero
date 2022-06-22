const mongoose = require("mongoose")
const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        min: 5
    },
    password: {
        type: String,
        required: true,
        min:5
    },

})
const User = mongoose.model("user", UserSchema)
module.exports = User