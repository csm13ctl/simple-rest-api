const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    suspend: {
        type: Boolean,
        required: true
    }
})

module.exports = mongoose.model('users', userSchema);