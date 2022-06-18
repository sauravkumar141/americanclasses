const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    src: String,
    date: String,
    text:  String,
    testSeries: Array,
    active: Boolean,
    subject: String
});

mongoose.model('testSeries', userSchema);

