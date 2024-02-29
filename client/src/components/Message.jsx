import './Message.css';

function Message ({item}) {

  return (
    <div id="message">
      <p>
       this is a message 💚 {item.message}
      </p>
    </div>
  )
}

export default Message;