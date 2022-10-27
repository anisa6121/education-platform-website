import React, { createContext } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, sendPasswordResetEmail, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import app from '../../firebase/firebase.config';
import { useState } from 'react';
import { useEffect } from 'react';

export const AuthContext = createContext();
 
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)

    const [loading , setLoading] = useState(true);
   
    const providerLogin = (provider) => {
      setLoading(true)
		return signInWithPopup(auth, provider);
    };  


    const signInWithGit = (provider) => {
        setLoading(true)
        return signInWithPopup(auth, provider)
    }
  
    
    const logOut = () => {
        setLoading(true)
        return signOut(auth)
    }

    const createUser = (email, password) => {
    setLoading(true)
        return createUserWithEmailAndPassword(auth, email,password)
    }


    const signIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    }
    


    const updateUserProfile = (profile) => {
        setLoading(true)
        return updateProfile(auth.currentUser, profile)
    }


      const resetPassword = (email) => {
		setLoading(true);
		return sendPasswordResetEmail(auth, email);
    };
    
    useEffect(() => {
 const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
console.log("user inside stateChange", currentUser)

     setUser(currentUser)
     setLoading(false)
 })
        
        return () => unsubscribe();
    },[])

    const authInfo = {
         setLoading,
		user,
		providerLogin,
		logOut,
		createUser,
		signIn,
		loading,
		updateUserProfile,
		resetPassword,
		signInWithGit,
    };
    



    return (
        <AuthContext.Provider value={authInfo}>
            {children}
       </AuthContext.Provider>
    );
};

export default AuthProvider;