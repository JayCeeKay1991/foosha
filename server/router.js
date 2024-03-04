const express = require('express')
const router = express.Router()
const controllerUser = require('./controllers/users');
const controllerItems = require('./controllers/items');
const controllerMessages = require('./controllers/messages');
const controllerConversations = require ('./controllers/conversations');


router.post('/user', controllerUser.createUser); // in use
router.post('/user/login', controllerUser.login); // in use
router.put('/user/:id', controllerUser.editUser); // in use
router.get('/user/:id', controllerUser.userById); // in use

router.post('/items', controllerItems.postItem); // in use
router.get('/items', controllerItems.allItems); // in use
router.get('/items/:id', controllerItems.itemById); // in use
router.get('/items/mine/:id', controllerItems.itemByOwner);
router.put('/items/:id', controllerItems.editItem); // in use
router.delete('/items/:id', controllerItems.deleteItem); // in use

router.post('/messages', controllerMessages.postMessage); // in use
router.get('/messages', controllerMessages.allMessages); // in use
router.get('/messages/:thread', controllerMessages.messagesByThread);

router.post('/conversations', controllerConversations.postConversation); // in use
router.get('/conversations', controllerConversations.allConversations); // in use
router.get('/conversations/:id/:contact', controllerConversations.getConversationByItemId);

module.exports = router;