import { useState, useEffect } from 'react';
import MyItem from '../components/MyItem';
import './ItemList.css';
import AddForm from '../components/AddForm';
import { useMainContext } from '../components/Context';

// show add form after clicking add button

function MyList () {
  const [showAddForm, setShowAddForm] = useState(false);
  const [myList, setMyList] = useState([]);
  const { user, list } = useMainContext();

  useEffect(() => {
    async function filterAndSet () {
      const filteredList = list.filter((elem) => elem.owner === user._id)
      setMyList(filteredList);
    }
    filterAndSet();
  }, [list]);


  return (
    <>
      <h2>My List</h2>
      <div id="item-list-container" >
        {
           (!myList.length) ? (<p>List is empty 🥦🥦🥦</p>) : (myList.map(elem => <MyItem key={elem._id} item={elem} setMyList={setMyList} ></MyItem>))
        }
      </div>
      <button id='add-button' className='button-turqouise' onClick={() => setShowAddForm(!showAddForm)}>{showAddForm ? 'cancel' : 'add'}</button>
      {showAddForm ? <AddForm setMyList={setMyList} setShowAddForm={setShowAddForm} ></AddForm> : null}
    </>
  )

}


export default MyList;