const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: String,
    mobile: String,
    message: String,
    date: String,
    time: String,
    active: Boolean
});

mongoose.model('feedbacks', userSchema);

