import { useState, useEffect } from "react";
import { getAllMessages, getMessageByThread } from "../services/messageService";
import './Conversation.css'
import Message from "./Message";

function Conversation ({item}) {
  const [messages, setMessages] = useState([]);

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
        <img id="thread-image" />
        <div id="thread-info">
          <h3>{item.itemName}</h3>
        </div>
        <div id="chat">
            {
              messages.map((elem, i) => elem.thread === item._id ? <Message key={elem._id} item={elem} ></Message> : null)
            }
            <p>Let's position the form</p>
        </div>
          {/* <p id="saved-stamp">{item.available ? '' : 'saved'}</p> */}
      </div>
  )


}

export default Conversation;