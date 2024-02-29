import { useState, useEffect } from "react";
import { getAllMessages, getMessageByThread } from "../services/messageService";
import { FaCommentDots } from 'react-icons/fa6';
import './Conversation.css'
import Message from "./Message";

function Conversation ({item}) {
  const [messages, setMessages] = useState([]);
  const [showChat, setShowChat] = useState(false);

  // load the full list when the route is loaded
  // sort by date for now, maybe by distance later
  useEffect(() => {
    async function fetchAndSet () {
      const data = await getAllMessages();
      setMessages(data);
    }
    fetchAndSet();
  }, []);


  return (
      <div id="thread" >
        <div id="thread-info">
          <h3>{item.itemName}</h3>
          {/* <img id="thread-image" /> */}
        </div>
          <button id="chat-toggle-button" onClick={() => setShowChat(!showChat)} >show chat <FaCommentDots></FaCommentDots> </button>
        {
          showChat ? (
            <div id="chat">
            {
              messages.map((elem, i) => elem.thread === item._id ? <Message key={elem._id} item={elem} ></Message> : null)
            }
            <p>This will be a form very soon 💚</p>
        </div>
          ) : null
        }
          {/* <p id="saved-stamp">{item.available ? '' : 'saved'}</p> */}
      </div>
  )

}

export default Conversation;