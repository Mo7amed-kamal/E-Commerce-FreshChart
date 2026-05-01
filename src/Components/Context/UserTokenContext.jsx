import { createContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";


export let userTokenContext = createContext(null)

export default function TokenContextProvider({children}) {
    let [token,setToken] = useState(null)
    let [userId,setUserId] = useState(null)


    function decodeToken() {
        return jwtDecode( JSON.stringify( localStorage.getItem("token") ) )
    }
 
    useEffect( ()=> {
        if(localStorage.getItem("token")) { // انا هنا خليت الكونتكست يشوف اللوكل ستوريدج متخزن فيه ايه علشان لما ارندر الكود بتاعي الناف بار ميتأثرسش
            setToken( localStorage.getItem("token") ) // وبكدا بقي شايفه
            setUserId(decodeToken().id)
        }
     
       
    },[] )

    return <userTokenContext.Provider value={{token,setToken,userId,decodeToken}}>
        {children}
    </userTokenContext.Provider>
}