import { useState, createContext } from 'react';
import { FaRightFromBracket } from 'react-icons/fa6';
import { FaParachuteBox } from 'react-icons/fa6';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FaPaperPlane } from 'react-icons/fa6';
import { Outlet, Link } from "react-router-dom";
import mainLogo from '../assets/logo-crop.jpg';
import LoginForm from '../components/Login';
import './Root.css';


// if logged in: app container, else: start screen
function Root() {
  const Context = createContext()
  const [user, setUser] = useState({
    _id: '',
    name: '',
    email: '',
    password: '',
    status: '',
    image: {},
    location: {},
    preferences: []
  });


  return (
    <>
    {user._id ? (
      <Context.Provider value={user}>
        <div id="app-container">
          <div id="top-menu" >
            <button id='user-button' ></button>
            <h4 className='background-logo'>Foosha</h4>
            <button className='button-turqouise' id='logout-button'>
            <FaRightFromBracket size={15}/>
            </button>
          </div>
          <div id='app-background'>
            <div id='item-list' >
              <Outlet />
            </div>
          </div>
          <nav id="bottom-menu" >
            <Link to={`/items/mine/{user._id}`} >
              <FaParachuteBox user={user} size={30} ></FaParachuteBox>
            </Link>
            <Link to={`/items`} >
            <FaMapLocationDot size={30} ></FaMapLocationDot>
            </Link>
            <button>
            <FaPaperPlane size={30} ></FaPaperPlane>
            </button>
          </nav>
        </div>
      </Context.Provider>
    ) : (
      <>
        <div>
          <img src={mainLogo} className="logo-image" alt="Logo" />
          <h1 className='logo-name' >Foosha</h1>
        </div>
        <LoginForm></LoginForm>
      </>
    )}
    </>
  )
}

export default Root;