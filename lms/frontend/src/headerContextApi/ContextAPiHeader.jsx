/* eslint-disable react/prop-types */
/* eslint-disable react-refresh/only-export-components */
import {createContext} from 'react';



 export const headerContext =  createContext();

function ContextAPiHeader({children}) {

    const email =  localStorage.getItem("email");
 

  return (
    <headerContext.Provider value={email}>
      {children}
    </headerContext.Provider>
  )
}

export default ContextAPiHeader;
