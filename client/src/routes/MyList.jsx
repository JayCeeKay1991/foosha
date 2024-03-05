import { useState, useEffect } from 'react';
import MyItem from '../components/MyItem';
import './ItemList.css';
import AddForm from '../components/AddForm';
import { useMainContext } from '../components/Context';

// show add form after clicking add button

function MyList () {
  const [showAddForm, setShowAddForm] = useState(false);
  const [showSavedItems, setShowSavedItems] = useState(false);
  const [myList, setMyList] = useState([]);
  const { user, list } = useMainContext();

  useEffect(() => {
    async function filterAndSet () {
      const filteredList = list.filter(elem => elem.owner === user._id && elem.available)
      setMyList(filteredList);
    }
    filterAndSet();
  }, [list]);

  function toggleList () {
    async function filterAndSet () {
      if (!showSavedItems) {
        const filteredList = list.filter(elem => elem.available === false && elem.owner === user._id)
        setMyList(filteredList);
        setShowSavedItems(true)
      } else {
        const filteredList = list.filter(elem => elem.available === true && elem.owner === user._id)
        setMyList(filteredList);
        setShowSavedItems(false)
      }
    }
    filterAndSet();
  }


  return (
    <>
      <h2>My List</h2>
      <button id="filter-button" onClick={toggleList} >{showSavedItems ? 'show open' : 'show saved'}</button>
      <div id="item-list-wrapper" >

      <div id="item-list-container" >
        {
          (!myList.length) ? (<p>No open items for now 🥦🥦🥦</p>) : (myList.map(elem => <MyItem key={elem._id} item={elem} ></MyItem>))
        }
      </div>
        </div>
      <button id='add-button' className='button-turqouise' onClick={() => setShowAddForm(!showAddForm)}>{showAddForm ? 'cancel' : 'add'}</button>
      {showAddForm ? <AddForm setShowAddForm={setShowAddForm} ></AddForm> : null}
    </>
  )

}


export default MyList;