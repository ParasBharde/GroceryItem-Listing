import React,{ useState, useEffect} from 'react'
 import {signOut} from 'firebase/auth';
 import {auth} from "../firebase";
import { useNavigate } from "react-router-dom";
import {onAuthStateChanged} from "firebase/auth";

export default function Header() {
 
  const navigate = useNavigate();
  const [isLoggedIn, updateIsLoggedIn] = useState(false);
  
  function logOut(e){
        signOut(auth).then(() => {navigate("/")})
  } 

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid;
        // ...
        updateIsLoggedIn(true);
      } else {
        // User is signed out
        // ...
        updateIsLoggedIn(false);

      }
    });      

  },[])
  
  
   function showLogoutButton(){ 
        if(isLoggedIn){
          return(
            <div className="ml-auto">
         <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 
            border border-transparent text-sm font-medium 
            rounded-md text-white bg-indigo-600 hover:bg-indigo-700 
            focus:outline-none focus:ring-2 
            focus:ring-offset-2 focus:ring-indigo-500 "
            onClick={(e)=>logOut(e)}
            >
             Logout
         </button>
         </div>
          )
        }
   }  
  return (
   
      <div className="bg-blue-700 h-16 
    w-full flex justify-center 
    items-center text-xl 
    font-bold text-white px-3">

        <span className="">Grocery Listing</span>
     
         {showLogoutButton()}
        
         </div>

  )
}


