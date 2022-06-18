const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    src: String,
    date: String,
    text:  String,
    results: Array,
    active: Boolean,
    total: String,
    clas: String
});

mongoose.model('results', userSchema);

