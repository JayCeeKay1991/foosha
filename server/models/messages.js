const mongoose = require('./index');

// defining data structure
const Message = new mongoose.Schema ({
  message: String,
  author: String, // user _id of sender
  thread: String, // conversation _id which this message is about
  read: {type: Boolean, default: false},
  dateTime: { type: Date, default: Date.now() },
});

const MessageModel = mongoose.model('messages', Message);
module.exports = MessageModel;
