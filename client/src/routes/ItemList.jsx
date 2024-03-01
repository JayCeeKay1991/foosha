import Item from '../components/Item';
import './ItemList.css';
import { useMainContext } from '../components/Context';

function ItemList () {

  const { user, list } = useMainContext();

  return (
    <>
      <h2>List</h2>
      <div id="item-list-container" >
        {
          (!list.filter(elem => elem.owner !== user._id).length) ? <p>Nothing on offer 🥦🥦🥦</p> : list.map(elem =>
            elem.owner !== user._id ? <Item key={elem._id} item={elem} ></Item> : null)
        }
      </div>
    </>
  )
}


export default ItemList;