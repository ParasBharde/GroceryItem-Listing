import './App.css';
import { useEffect, useState} from "react";
import Header from "./components/Header";
import GrocerySection from './components/GrocerySection';
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import ProtectedRoute from './components/ProtectedRoute';
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "./firebase";



function App() {
  
  const[isLoggedIn, updateIsLoggedIn] = useState(false);
  const[isLoading, updateIsLoading] = useState(true);
  useEffect(() => {
   onAuthStateChanged(auth,(user) => {
       if (user) {
           // User is signed in, see docs for a list of available properties
           // https://firebase.google.com/docs/reference/js/firebase.User
           //const uid = user.uid;
           // ...
           updateIsLoggedIn(true);
           updateIsLoading(false);
         } else {
           // User is signed out
           // ...
           updateIsLoggedIn(false);
           updateIsLoading(false);
   
         }
   });
  },[]);
  if(isLoading){
    return <div>Loading...</div>
  }

  return (
   <Router>
   <div className="App">
      <Header />
      </div>

   <Routes>
      
         <Route path="/" element={<LoginForm/>} exact/>
           <Route path="/register" element={ <RegistrationForm />} />
         
          {/* Protected Routes */}
          
             <Route element={ <ProtectedRoute isLoggedIn={isLoggedIn} />  }> 
                <Route path="/app" element={<GrocerySection/>} />
             </Route>
           
           {/* <Route  path="/app" element={<GrocerySection/>}  /> */}
          
      
   </Routes>
       
    
    </Router>
  );
}
export default App;
