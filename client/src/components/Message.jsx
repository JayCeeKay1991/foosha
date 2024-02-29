import './Message.css';

function Message ({item}) {

  return (
    <div id="message">
      <p>
       {item.message}
      </p>
    </div>
  )
}

export default Message;