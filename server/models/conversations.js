const mongoose = require('./index');

// defining data structure
const Conversation = new mongoose.Schema ({
  itemName: String, // item name which this conversation is about
  itemId: String,  // item _id which this conversation is about
  contact: String, // user _id of the contacting person
  owner: String, // user _id of the item's owner
  date: { type: Date, default: Date.now() } // date of conversation start
});

const ConversationModel = mongoose.model('conversations', Conversation);
module.exports = ConversationModel;
