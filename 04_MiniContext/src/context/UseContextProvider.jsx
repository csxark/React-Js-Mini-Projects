import React, { Children, useContext, useState } from "react";
import { Context } from "./UseContextProvider";

const UseContextProvider = ({Children}) => {
  const { count, setCount } = useState(null);
  return(
    <UseContextProvider>
        {Children}
    </UseContextProvider>    
  )  

}  