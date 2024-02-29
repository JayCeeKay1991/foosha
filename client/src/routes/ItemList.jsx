import { useState, useEffect } from 'react';
import Item from '../components/Item';
import './ItemList.css';
import { getAllItems } from '../services/itemService'
import { useMainContext } from '../components/Context';

// show add form after clicking add button

function ItemList () {

  const [list, setList] = useState([]);

  // load the full list when the route is loaded
  // sort by date for now, maybe by distance later
  useEffect(() => {
    async function fetchAndSet () {
      const data = await getAllItems();
      const sortedList = data.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB
      });
      setList(sortedList);
    }
    fetchAndSet();
  }, []);

  // each time the list is updated, we create a filtered list
  // also update when the inividual item is updated - item update must update list

  return (
    <>
      <h2>List</h2>
      <div id="item-list-container" >
        {
           (!list.length) ? (<p>Nothing here right now 🥦</p>) : (list.map(elem => <Item key={elem._id} item={elem} ></Item>))
        }
      </div>
    </>
  )

}


export default ItemList;