//import logo from './logo.svg';
import firebase from "firebase/app";
import "firebase/auth";
import './App.css';
import firebaseConfig from './simple-auth-v2-config';

firebase.initializeApp(firebaseConfig);
function App() {

  const handelBlur = (e) => {
    console.log(e.target.name,e.target.value)
    if(e.target.name === "email"){
        const re = /\S+@\S+\.\S+/;
        let isEmailValid = re.test(e.target.value);
        console.log(isEmailValid);
    }else if(e.target.name === "password"){
        const isPasswordValid = e.target.value.length > 6 ;
        const re = /\d{1}/;
        const passwordHasNumber = re.test(e.target.value);
        console.log(isPasswordValid && passwordHasNumber);
    }
  } 

  const handelSubmit = () => {
    
  }
  return (
    <div className="App">
      <h1>Our own Authentication</h1>
      <form onSubmit={handelSubmit}>
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
