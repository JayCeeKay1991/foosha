import { useState, useEffect } from "react";
import { getMessageByThread } from "../services/messageService";
import './Thread.css'
import { formatDateTime } from "../services/utils";

function Thread ({item}) {
  const [messages, setMessages] = useState([]);

  // load the full list when the route is loaded
  // sort by date for now, maybe by distance later
  useEffect(() => {
    async function fetchAndSet () {
      const data = await getMessageByThread();
      const sortedMessages = data.sort((a, b) => a.thread - b.thread);
      setMessages(sortedMessages);
    }
    fetchAndSet();
  }, []);


  return (
      <div id="thread-container" >
        <img id="thread-image" />
        <div id="thread-info">
          <h3>title</h3>
          <p>{item.message}</p>
          <p>{formatDateTime(item.dateTime)}</p>
          <p id="saved-stamp">saved</p>
        </div>
      </div>
  )


}

export default Thread;