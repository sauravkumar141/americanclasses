const mongoose = require('mongoose');

const uri = "mongodb+srv://americanclasses:americanclasses5398@cluster0.nhv3v.mongodb.net/americanclasses?retryWrites=true&w=majority";

mongoose.connect("mongodb://localhost/american", {useNewUrlParser: true, useUnifiedTopology: true}, error =>{
  !error ? console.log('MongoDb Connected....') : console.log('MongoDB not conneted, Error is... ', error);
});

require('../connectionSchema/notificationDBSchema');
require('../connectionSchema/resultDBSchema');
require('../connectionSchema/tenthStudentSchema');
require('../connectionSchema/ninethStudentSchema');
require('../connectionSchema/adminLoginSchema');
require('../connectionSchema/blogPostSchema');
require('../connectionSchema/feedBackSchema');
require('../connectionSchema/testSeriesDBSchema');

/*
"mongodb://localhost/american"
*/