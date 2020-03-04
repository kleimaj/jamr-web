const mongoose = require('mongoose');
const DB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/music-network';

mongoose.connect(DB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
    .then(() => console.log('MongoDB connnected successfully...'))
    .catch((err) => console.log(err));
  
module.exports = {
    User: require('./User'),
    Profile: require('./Profile'),
    Comment: require('./Comment'),
};