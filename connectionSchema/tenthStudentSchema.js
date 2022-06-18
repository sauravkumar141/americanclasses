const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    studentName: String,
    fatherName: String,
    address: String,
    mobileNumber: String,
    gender: String,
    class: String,
    studentId: String,
    password: String
});

mongoose.model('10th students', userSchema);

