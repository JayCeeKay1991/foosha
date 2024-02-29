import Item from '../components/Item';
import './ItemList.css';
import { useMainContext } from '../components/Context';

function ItemList () {

  const { list } = useMainContext();

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