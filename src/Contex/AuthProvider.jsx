import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContex";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
  GoogleAuthProvider
} from "firebase/auth";
import { auth } from "../Firebase/Firebase.config";



const AuthProvider = ({ children }) => {

  const googleprovider = new GoogleAuthProvider();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const CreateUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const Login = (email, passowrd) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, passowrd);
  };

  const GoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleprovider);
  };

  const LogOut = () => {
    setLoading(true);
    return signOut(auth);
  };

  const ForgotPass = (email) => {
    return sendPasswordResetEmail(auth, email);
  };
  const UpdateUser = (userData) => {
    return updateProfile(auth.currentUser, userData);
  };
 
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);



  const userInfo = {
    user,
    setUser,
    loading,
    CreateUser,
    Login,
    GoogleSignIn,
    LogOut,
    ForgotPass,
    UpdateUser,
  };

  return <AuthContext value={userInfo}>{children}</AuthContext>;
};

export default AuthProvider;
