const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    src: String,
    date: String,
    text:  String,
    notification: String,
    active: Boolean
});

mongoose.model('notifications', userSchema);

