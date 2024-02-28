import { useState, useEffect, useContext } from 'react';
import MyItem from '../components/MyItem';
import './ItemList.css';
import AddForm from '../components/AddForm';
import { getItemByOwner } from '../services/itemService'
import  Context  from './root';

// show add form after clicking add button

function MyList () {
  const [list, setList] = useState([]);
  const [myList, setMyList] = useState([]);

  //const { user } = useContext(Context);

  // load the full list when the route is loaded
  // sort by date for now, maybe by distance later

  useEffect(() => {
    async function fetchAndSet () {
      const userId = user._id;
      const data = await getItemByOwner(userId);
      const sortedList = data.sort((a, b) => {
        let dateA = new Date(a.date);
        let dateB = new Date(b.date);
        return dateA - dateB
      });
      setMyList(sortedList);
    }
    fetchAndSet();
  }, []);


  return (
    <>
      <h2>My List</h2>
      <div id="item-list-container" >
        {
           (!myList.length) ? (<p>Nothing to save right now 🥦</p>) : (myList.map(elem => <MyItem key={elem._id} item={elem} ></MyItem>))
        }
      </div>
      <button id='add-button' className='button-turqouise' >add</button>
      {/* <AddForm></AddForm> */}
    </>
  )

}


export default MyList;