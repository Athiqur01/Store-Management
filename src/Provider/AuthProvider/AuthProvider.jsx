import { createContext, useEffect, useRef, useState } from "react";
import { app } from "../../firebase/firebase.config";
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const AuthContext=createContext(null)
const auth=getAuth(app)
const AuthProvider = ({children}) => {

    const dropdownRef = useRef(null)
    const [user, setUser]=useState(null)
    const [loading, setLoading]=useState(true)
    const [dropDownState, setDropDownState]=useState(false)
    
    const createUser=(email,password)=>{
          setLoading(true)
          return createUserWithEmailAndPassword(auth,email,password)
    }

    const loginUser=(email,password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }

    
    const logOut=()=>{
        setLoading(true)
        return signOut(auth)
    }

    useEffect(()=>{
       const unSubscribe= onAuthStateChanged(auth,currentUser=>{
            setUser(currentUser)
            setLoading(false)
            if(currentUser){
             const userInfo={email:currentUser?.email}
             axios.post('http://localhost:5012/jwt',userInfo)
             .then(res=>{
                if(res.data.token){
                    localStorage.setItem('access_token', res.data.token)
                }
             })  
            }

            else{
                localStorage.removeItem('access_token')
            }
            console.log('current user', currentUser)
        });
        return ()=>{
            return unSubscribe()
        }
    },[])


    const authInfo={user,setUser,loading, createUser,loginUser,logOut,dropdownRef,dropDownState, setDropDownState}

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;