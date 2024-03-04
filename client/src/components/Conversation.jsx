import { useEffect, useState } from "react";
import { postMessage } from "../services/messageService";
import { FaCommentDots, FaUser } from 'react-icons/fa6';
import './Conversation.css'
import Message from "./Message";
import { useMainContext } from "./Context";
import { formatDateTime } from "../services/utils";
import { getUserById } from "../services/userService";


function Conversation ({item}) {
  const [showChat, setShowChat] = useState(false);
  const [messagesByConversation, setMessagesByConversation] = useState([]);
  const { user, messageList, setMessageList } = useMainContext();


  const initialState = {
    message: "",
    author: user._id,
    thread: item._id,
  }

  const [formValues, setFormValues] = useState(initialState);

  // changes in the form
  function changeHandler (e) {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value});
  }

  // send a new message
  async function submitHandler (e) {
    e.preventDefault();
    try {
      async function sendMessage (formValues) {
        const newMessage = await postMessage(formValues);
        setMessageList((prevList) => [...prevList, newMessage]);
        setFormValues(initialState);
      }
      sendMessage(formValues);
    } catch (error) {
      console.error(error);
    }
  };

  // show the messages belonging to each conversation
  useEffect(() => {
    const filteredMessages = messageList.filter(elem => elem.thread === item._id);
    setMessagesByConversation(filteredMessages);
  }, [messageList])


  // show the contact info on the conversation
  useEffect(() => {
    async function getOwnerAndContact () {
      const itemOwner = await getUserById(item.owner);
      const itemContact = await getUserById(item.contact);
      item.contactImage = itemContact.image || '';
      item.ownerImage = itemOwner.image || '';
    };
    getOwnerAndContact(item._id)
  })

  return (
    <>
    <div id="thread-with-chat" >
      <div id="thread" >
        <img src={item.itemImage} id="thread-image" />
        <div id="thread-info">
          <h3>{item.itemName}</h3>
          {
            messagesByConversation.map(
              (elem, i) =>
              i === messagesByConversation.length - 1 ?
              <div key={elem._id} >
                <p> {messagesByConversation.length} message{messagesByConversation.length > 1 ? 's' : ''} </p>
                <p >last message: {formatDateTime(elem.dateTime)}</p>
                {
                  i === messagesByConversation.length - 1 && elem.author !== user._id && item.available ?  <p id="your-turn-badge" >{'your turn!'}</p> : ''
                }
              </div>
            : ''
            )
          }
        </div>
        {
           item.owner === user._id ? <img id="contact-image" src={item.contactImage}></img> : item.contact === user._id ? <img id="owner-image" src={item.ownerImage}></img> : null
        }
        </div>
        <div>
          <button id="chat-toggle-button" onClick={() => setShowChat(!showChat)} >{showChat ? 'hide chat ' : 'show chat '}<FaCommentDots></FaCommentDots> </button>
        {
          showChat ? (
            <div id="chat"
              style={{
                ...(item.itemImage && { backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url(${item.itemImage})`}),
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }} >
              <div id="chat-bubbles">
            {
              messagesByConversation.map(elem => <Message key={elem._id} item={elem} ></Message>)
            }
            </div>
              <form id="chat-form" onSubmit={submitHandler}>
                <input type="text" name="message" value={formValues.message} onChange={changeHandler} placeholder="Be nice!"
                />
                 <button className="save-button button-turqouise" type="submit">Send</button>
              </form>
          </div>
          ) : null
        }
          <p id="saved-stamp">{item.available ? '' : 'saved'}</p>
      </div>
    </div>
  </>
  )

}

export default Conversation;