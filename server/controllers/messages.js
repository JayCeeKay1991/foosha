const MessageModel = require('../models/messages');

// posting new message to database
exports.postMessage = async (req, res) => {
  try {
    const message = req.body;
    const newMessage = new MessageModel(message);
    newMessage.save();
    res.status(201);
    res.send(newMessage);
  } catch (error) {
    console.error();
    res.status(500);
    res.send({ message: "An unexpected error occurred while posting the message. Please try again later." });
  }
}

// getting all messages from database
exports.allMessages = async (req, res) => {
  try {
    const messages = await MessageModel.find();
    res.status(200);
    res.send(messages);
    return res.body;
  } catch (error) {
    console.error();
    res.status(500);
    res.send({ message: "An unexpected error occurred while getting the messages. Please try again later." });
  }
}


