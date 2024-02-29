const mongoose = require('./index');

// defining data structure
const Conversation = new mongoose.Schema ({
  itemName: String, // item name which this conversation is about
  itemIt: String,  // item _id which this conversation is about
  contact: String, // user _id of the contacting person
  date: { type: Date, default: Date.now() } // date of conversation start
});

const ConversationModel = mongoose.model('conversations', Conversation);
module.exports = ConversationModel;
