const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost:27017/test');

const userSchema = new mongoose.Schema({


    name: String,
    age: Number,
    email: String,



});



module.exports = mongoose.model('User', userSchema);