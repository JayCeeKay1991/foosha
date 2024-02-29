import { useState, useEffect } from "react";
import { getAllMessages, getMessageByThread } from "../services/messageService";
import './Conversation.css'
import { formatDateTime } from "../services/utils";
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
      <div id="thread-container" >
        <img id="thread-image" />
        <div id="thread-info">
          <h3>{item.itemName}</h3>
          <ol>
            {
            messages.map(elem => elem.thread === item._id ? <Message key={elem._id} item={elem} ></Message> : null)
            }
          </ol>
          <p>{formatDateTime(item.date)}</p>
          <p id="saved-stamp">{item.available ? '' : 'saved'}</p>
        </div>
      </div>
  )


}

export default Conversation;