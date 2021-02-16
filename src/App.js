//import logo from './logo.svg';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import firebaseConfig from './simple-auth-v2-config';

firebase.initializeApp(firebaseConfig);
function App() {

  const [user,setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '' 
  })

  const handelBlur = (e) => {
    let isFormValid = true;
    if(e.target.name === "email"){
        const re = /\S+@\S+\.\S+/;
        isFormValid = re.test(e.target.value);
        console.log(isFormValid);
    }else if(e.target.name === "password"){
        const isPasswordValid = e.target.value.length > 6 ;
        const re = /\d{1}/;
        const passwordHasNumber = re.test(e.target.value);
        isFormValid = isPasswordValid && passwordHasNumber;
        console.log(isFormValid);
    }
    if(isFormValid){
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      console.log(user);

    }
  } 

  const handelSubmit = () => {
    
  }
  return (
    <div className="App">
      <h1>Our own Authentication</h1>
      <p>Name: {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Password : {user.password}</p>
      <form onSubmit={handelSubmit}>
        <input type="text" name="name" placeholder="Your Name" onBlur={handelBlur} required/>
        <br/>
        <input type="text" name="email" placeholder="Your Email Address" required onBlur={handelBlur} />
        <br />
        <input type="password" name="password" id="" placeholder="Your Password" required onBlur={handelBlur} />
        <br />
        <input type="submit" value="Submit"/>
      </form>
    </div>
  );
}

export default App;
