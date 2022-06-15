//  import { useEffect, useState} from "react";
// import {Navigate} from 'react-router-dom';


//  function ProtectedRoute({componet: Component,...restOfProps}) {
//  // const [isLoggedIn, updateIsLoggedIn] = useState(false);
  
//   console.log("isLoggedIn", restOfProps.isLoggedIn);
//    return(
//      <>
//         render={(props) =>
//        restOfProps.isLoggedIn ? <Component {...props} /> : <Navigate to="/" /> 
//       }
//       </>
//   )
// }
// export default ProtectedRoute;



import { useEffect, useState} from "react";
import {Navigate, Outlet} from 'react-router-dom';
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";

 function ProtectedRoute(props) {
 // const [isLoggedIn, updateIsLoggedIn] = useState(false);
  
  console.log("isLoggedIn", props.isLoggedIn);
   return(
     <div>

       {props.isLoggedIn ? <Outlet /> : <Navigate to="/" /> }
     </div>

   )

}

export default ProtectedRoute;