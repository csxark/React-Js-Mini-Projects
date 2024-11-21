import { useState } from "react";
import { UserContext } from "./UseContextProvider";

const UserContextProvider = ({Children}) => {
  const [user,setuser] = useState(null);
  return(
    <UserContext.Provider value={{user,setuser}}>
        {Children} 
    </ UserContext.Provider>    
  )  

}  