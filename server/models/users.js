const mongoose = require('./index');

// defining data structure
const User = new mongoose.Schema ({
  name: String,
  email: String,
  password: String,
  status: String,
  image: String,
  preferences: [String]

});

const UserModel = mongoose.model('users', User);
module.exports = UserModel;
