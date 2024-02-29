import './Message.css';
import { formatDateTime } from '../services/utils';
import { useMainContext } from "./Context";

function Message ({item}) {

  const { user } = useMainContext();

  return (
    <>
      {
        item.author === user._id ? (
          <div className='message' id="message-outbound" >
            <p className='message-text' >{item.message}</p>
            <p id="message-timestamp" >{formatDateTime(item.dateTime)}</p>
          </div>
          ) : (
            <div className='message' id="message-inbound" >
            <p className='message-text' >{item.message}</p>
            <p id="message-timestamp" >{formatDateTime(item.dateTime)}</p>
          </div>
        )
      }
    </>
  )
}

export default Message;