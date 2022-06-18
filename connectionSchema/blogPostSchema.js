const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    src: String,
    datetime: String,
    name:  String,
    message: String,
});

mongoose.model('blogPosts', userSchema);

