import { useState, createContext } from 'react';
import { useNavigate } from "react-router-dom";
import { FaRightFromBracket } from 'react-icons/fa6';
import { FaParachuteBox } from 'react-icons/fa6';
import { FaMapLocationDot } from 'react-icons/fa6';
import { FaPaperPlane } from 'react-icons/fa6';
import { Outlet, Link } from "react-router-dom";
import mainLogo from '../assets/logo-crop.jpg';
import { login } from "../services/userService";
import './root.css';


// if logged in: app container, else: start screen
function Root() {
  const Context = createContext()

  const navigate = useNavigate()
  const [user, setUser] = useState({});

  const [formValues, setFormValues] = useState({
    email: "",
    password: ""
  });

  // changes in the form
  function changeHandler (event) {
    const { name, value } = event.target;
    setFormValues({ ...formValues, [name]: value});
  }

  // submitting the form: login and navigate to all items
  const handleSubmit = async (e) => {
    e.preventDefault();
    async function logInAndSet (formValues) {
      const { email, password } = formValues;
      const user = { email, password };
      const loggedInUser = await login(user);
      setFormValues({email: "", password: ""});
      setUser(loggedInUser);
      navigate('/items');
    }
    logInAndSet(formValues);
  };



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

        <form id="login-form" onSubmit={handleSubmit} >
          <input name="email" type="text" value={formValues.email} onChange={changeHandler} placeholder="email" required={true} ></input>
          <input name="password" type="text" value={formValues.password} onChange={changeHandler} placeholder="password" required={true} ></input>
          <button className="login-button button-turqouise" type="submit"  >login</button>
        </form>
      </>
    )}
    </>
  )
}

export default Root;