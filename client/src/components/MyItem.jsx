import './MyItem.css';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';
import { FaCircleCheck } from 'react-icons/fa6';
import { formatDate } from '../services/utils';
import { deleteItem } from '../services/itemService';
import { editItem } from '../services/itemService';

function MyItem ({item, setMyList}) {

  const handleDelete = async () => {
    try {
      async function deleteAndSet (id) {
      await deleteItem(id);
      setMyList((list) => list.filter(elem => elem._id !== item._id ));
    }
    deleteAndSet(item._id);
    } catch (error) {
      console.log(error);
    }
  }

  const markAsSaved = async () => {
    try {
      const body = item;
      const data = await editItem(item._id, {...body, available: false});
      console.log(data);
      setMyList((list) => list.map(elem => {
        // is this the element we clicked on?
        if (elem._id === item._id) {
          // if so, return new data
          return data;
        } else {
          // else return the old data
          return elem;
        }
      }
      ))
    } catch (error) {
      console.log(error);
    }
  }



  return (
    <div id="item-container">
      <div id="item-info" >
        <img id="item-image" src={item.image} ></img>
        <p id="item-date" >{formatDate(item.date)}</p>
         <p id="item-location" > <FaLocationDot></FaLocationDot>location </p>
      </div>

      <div id="item-text" >
        <h3>{item.title}</h3>
        <p id="item-description" >{item.description}</p>
      </div>
      <img></img>
      <div id="item-tools" >
        <button> <FaPencil></FaPencil> </button>
        <button onClick={markAsSaved} > <FaCircleCheck></FaCircleCheck> </button>
        <button onClick={handleDelete} > <FaTrashCan></FaTrashCan> </button>
      </div>
      <p id="saved-stamp" >{item.available ? '' : 'saved'} </p>
    </div>
  )
}

export default MyItem;