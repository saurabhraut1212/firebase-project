import React, { useState } from 'react';
import {auth ,googleProvider} from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';    //for google auth //signInWithPopup

const Auth = () => {
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    
  console.log(auth?.currentUser?.email)
    const SignIn=async()=>{
        try {
            await createUserWithEmailAndPassword(auth,email,password)
        } catch (error) {
            console.log(error)
        }

    }

    const SignInWithGoogle = async () => {
        try {
            await signInWithPopup(auth, googleProvider)
        } catch (error) {
            console.log(error)
        }

    }

    const logout=async()=>{
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div>
            <input type="text" placeholder="Email..." value={email} onChange={(e)=>setEmail(e.target.value)}/>
            <input type="password" placeholder="Password..." value={password} onChange={(e) => setPassword(e.target.value)} />
            <button onClick={SignIn}>Sign in</button>
            <button onClick={SignInWithGoogle}>Signin with google</button>
            <button onClick={logout}>Logout</button>
        </div>
    );
};

export default Auth;