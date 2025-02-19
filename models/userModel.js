const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/test');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
    },
    age: Number,
    email: String,
    post: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post'
        }
    ]

});


module.exports = mongoose.model('user', userSchema);