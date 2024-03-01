import { useState } from "react";
import { postMessage } from "../services/messageService";
import { FaCommentDots } from 'react-icons/fa6';
import './Conversation.css'
import Message from "./Message";
import { useMainContext } from "./Context";

function Conversation ({item}) {
  const [showChat, setShowChat] = useState(false);
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
      console.log('💚', item)
      async function sendMessage (formValues) {
        const newMessage = await postMessage(formValues);
        console.log('🦋', newMessage)
        setMessageList((prevList) => [...prevList, newMessage]);
        setFormValues(initialState);
      }
      sendMessage(formValues);
    } catch (error) {
      console.error(error);
    }
  };

  return (
      <div id="thread" >
        <div id="thread-info">
          <h3>{item.itemName}</h3>
          {/* <img id="thread-image" /> */}
        </div>
          <button id="chat-toggle-button" onClick={() => setShowChat(!showChat)} >{showChat ? 'hide chat ' : 'show chat '}<FaCommentDots></FaCommentDots> </button>
        {
          showChat ? (
            <div id="chat">
              <div id="chat-bubbles" >
            {
              messageList.map((elem, i) => elem.thread === item._id ? <Message key={elem._id} item={elem} ></Message> : null)
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
          {/* <p id="saved-stamp">{item.available ? '' : 'saved'}</p> */}
      </div>
  )

}

export default Conversation;