//import logo from './logo.svg';
import firebase from "firebase/app";
import "firebase/auth";
import { useState } from "react";
import './App.css';
import firebaseConfig from './simple-auth-v2-config';

firebase.initializeApp(firebaseConfig);
function App() {
  const [newUser,setNewUser] = useState(false);
  const [user,setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: '' ,
    error:'',
    success: false
  })

  const handelBlur = (e) => {
    let isFieldValid = true;
    if(e.target.name === "email"){
        const re = /\S+@\S+\.\S+/;
        isFieldValid = re.test(e.target.value);
        console.log(isFieldValid);
    }else if(e.target.name === "password"){
        const isPasswordValid = e.target.value.length > 6 ;
        const re = /\d{1}/;
        const passwordHasNumber = re.test(e.target.value);
        isFieldValid = isPasswordValid && passwordHasNumber;
        console.log(isFieldValid);
    }
    if(isFieldValid){
      const newUserInfo = {...user}
      newUserInfo[e.target.name] = e.target.value;
      setUser(newUserInfo);
      console.log(user);

    }
  } 

  const handelSubmit = (e) => {
    console.log(user.email,user.password);
      if(newUser && user.email && user.password){
          firebase.auth().createUserWithEmailAndPassword(user.email,user.password)
          .then((res) => {
            const newUserInfo = {...user}
            newUserInfo.error = '';
            newUserInfo.success = true;
            setUser(newUserInfo);
          
          })
          .catch((error) => {
            const newUserInfo = {...user}
            newUserInfo.error = error.message;
            newUserInfo.success = false;
            setUser(newUserInfo);
            // var errorCode = error.code;
            // var errorMessage = error.message;
            // console.log(errorCode,errorMessage);
          });
      }
      if(!newUser && user.email && user.password){
        firebase.auth().signInWithEmailAndPassword(user.email, user.password)
        .then(res => {
          const newUserInfo = {...user}
          newUserInfo.error = '';
          newUserInfo.success = true;
          setUser(newUserInfo);
        })
        .catch(error => {
          const newUserInfo = {...user}
          newUserInfo.error = error.message;
          newUserInfo.success = false;
          setUser(newUserInfo);
        })
      }
      e.preventDefault();
  }
  return (
    <div className="App">
      <h1>Our own Authentication</h1>
      <p>Name: {user.name}</p>
      <p>Email : {user.email}</p>
      <p>Password : {user.password}</p>
      <input type="checkbox" onChange={ () => setNewUser(!newUser)} name="newUser" id=""/>
      <label htmlFor="newUser">New User Sign up</label>
      <form onSubmit={handelSubmit}>
        {newUser &&  <input type="text" name="name" placeholder="Your Name" onBlur={handelBlur} required/> } 
        <br/>
        <input type="text" name="email" placeholder="Your Email Address" required onBlur={handelBlur} />
        <br />
        <input type="password" name="password" id="" placeholder="Your Password" required onBlur={handelBlur} />
        <br />
        <input type="submit" value="Submit"/>
      </form>
      <p style={{color : 'red'}}>{user.error}</p>
      {user.success && <p style={{color:'green'}}>User {newUser ? 'Created' : 'Logged in'} Successfully</p>}
    </div>
  );
}

export default App;
