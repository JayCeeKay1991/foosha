const ConversationModel = require('../models/conversations');

// posting new conversation to database
exports.postConversation = async (req, res) => {
  try {
    const conversation = req.body;
    const newConversation = new ConversationModel(conversation);
    newConversation.save();
    res.status(201);
    res.send(newConversation);
  } catch (error) {
    console.error();
    res.status(500);
    res.send({ message: "An unexpected error occurred while creating the conversation. Please try again later." });
  }
}

// getting all conversations from database
exports.allConversations = async (req, res) => {
  try {
    const conversations = await ConversationModel.find();
    res.status(200);
    res.send(conversations);
    return res.body;
  } catch (error) {
    console.error();
    res.status(500);
    res.send({ message: "An unexpected error occurred while getting the conversations. Please try again later." });
  }
}

// getting converation for a certain item and contact
exports.getConversationByItemId = async (req, res) => {
  try {
    const id = req.params.id;
    const contact = req.params.contact;
    const conversation = await ConversationModel.findOne({itemId: id, contact: contact}).populate('owner');
    res.status(200);
    res.send(conversation);
  } catch (error) {
    res.status(500);
    res.send({ message: "An unexpected error occurred while getting the conversation. Please try again later." });
  }
}


