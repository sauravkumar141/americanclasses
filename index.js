const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json({limit: '500mb'}))
mongoose.Promise = global.Promise;

require('./mongoDBConnection/connection');
require('./mongoDBConnection/mongoDBRoutes')(app);

if(process.env.NODE_ENV === 'production'){
  // express will serve up production assets
  //like our main.js file, main.css file
  app.use(express.static('client/build'));
  //express will serve up index.html file
  //if it does not recognize the route
  const path = require('path');
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT);
