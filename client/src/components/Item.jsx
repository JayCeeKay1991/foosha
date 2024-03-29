import { useEffect, useRef, useState } from 'react';
import './Item.css';
import { FaLocationDot } from 'react-icons/fa6';
import { FaCommentDots } from 'react-icons/fa6';
import { formatDate } from '../services/utils';
import ContactForm from './ContactForm';

function Item ({item}) {

  const [showContactForm, setShowContactForm] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    if (showContactForm) {
      itemRef.current.scrollIntoView({behaviour: 'smooth', block: 'nearest'})
    }
  }, [showContactForm])


  return (
    <>
      <div id="item-container">
        <div id="item-info" >
          <img id="item-image" src={item.image} ></img>
          <p id="item-date" >{formatDate(item.date)}</p>
          <p id="item-location" > <FaLocationDot></FaLocationDot>{item.locationName} </p>
        </div>
        <div id="item-text" >
          <h3>{item.title}</h3>
          <p id="item-description" >{item.description}</p>
        </div>
        <img></img>
        {item.available ? (
          <div id="item-tools" >
          <button onClick={() => setShowContactForm(!showContactForm)} > <FaCommentDots></FaCommentDots> </button>
          </div>
          ) : (
            <p id="saved-stamp" >saved</p>
          )}
      </div>
      <div ref={itemRef} >

        {showContactForm ? <ContactForm   item={item} setShowContactForm={setShowContactForm} ></ContactForm> : null}
      </div>
    </>
  )
}

export default Item;