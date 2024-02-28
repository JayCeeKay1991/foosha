const mongoose = require('./index');

// defining data structure
const User = new mongoose.Schema ({
  name: String,
  email: String,
  password: String,
  status: String,
  image:
    {
        data: Buffer,
        contentType: String
    },
  location: {
    type: {
      type: String,
      enum: ['Point'],
      //required: true
    },
    coordinates: {
      type: [Number],
      //required: true
    }
  },
  preferences: [String]

});

const UserModel = mongoose.model('users', User);
module.exports = UserModel;
