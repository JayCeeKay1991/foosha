import './MyItem.css';
import './Item.css';
import { FaLocationDot } from 'react-icons/fa6';
import { FaPencil } from 'react-icons/fa6';
import { FaTrashCan } from 'react-icons/fa6';
import { FaCircleCheck } from 'react-icons/fa6';
import { formatDate } from '../services/utils';
import { deleteItem } from '../services/itemService';
import { editItem } from '../services/itemService';
import { useMainContext } from './Context';

function MyItem ({item}) {

  const { setList } = useMainContext();

  const handleDelete = async () => {
    try {
      async function deleteAndSet (id) {
      await deleteItem(id);
      setList((list) => list.filter(elem => elem._id !== item._id ));
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
      setList((list) => list.map(elem => {
        if (elem._id === item._id) {
          return data;
        } else {
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
         <p id="item-location" > <FaLocationDot></FaLocationDot>{item.locationName}</p>
      </div>

      <div id="item-text" >
        <h3>{item.title}</h3>
        <p id="item-description" >{item.description}</p>
      </div>
      <img></img>
        {item.available ? (
          <div id="item-tools" >
        <button> <FaPencil></FaPencil> </button>
        <button onClick={markAsSaved} > <FaCircleCheck></FaCircleCheck> </button>
        <button onClick={handleDelete} > <FaTrashCan></FaTrashCan> </button>
      </div>
        ) : (
          <p id="saved-stamp" >saved</p>
        )}
    </div>
  )
}

export default MyItem;