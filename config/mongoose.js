const mongoose = require('mongoose');
const { DB_URI } = require('../config/config')
const dbOptions = {
  useNewUrlParser: true, 
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false,
}

mongoose.connect(DB_URI, dbOptions);
const db = mongoose.connection;

mongoose.connection.on('error', console.error.bind(console, 'connection error'));
mongoose.connection.once('open', function(){
  console.log('DB is connected.');
})

module.exports = db;