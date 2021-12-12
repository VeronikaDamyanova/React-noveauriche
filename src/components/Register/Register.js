
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { doc, setDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signOut, updateProfile  } from "firebase/auth";
import { db } from '../../utils/firebase';

export const auth = getAuth();

const Register = ({
    history
}) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
        const registerWithEmailAndPassword = async (name, email, password) => {
            try {

              if(name, email, password) {
                const res = await createUserWithEmailAndPassword(auth, email, password); 
            
                const user = res.user;
  
                const newUser = {
                  uid: user.uid,
                  name,
                  email,
                };
            
                updateProfile(auth.currentUser, {
                  displayName: name
                })
  
                await setDoc(doc(db, "users", newUser.uid), newUser).then(()=> {
                  toast.success("Successful Registration!", {
                    position: toast.POSITION.TOP_CENTER
                  })
                  signOut(auth).then(() => {
                    history.push('/login');
    
                  })
                })
              }
              
            } catch (error) {
              toast.error(error.code);
            }
          };

          const register = (e) => {            
            e.preventDefault()

            if (!name) {
              toast.warn("Please enter your name !", {

              })
            } else if (!email) {
              toast.warn("Please enter your email !", {

              })
            } else if (!password) {
              toast.warn("Please enter your password !", {

              })
            } 
            registerWithEmailAndPassword(name, email, password);
          };

    return (
        <div className="login-register-page">
            <form >
                <h2>Register User</h2>

                <input type="text" name="name"  value={name}
          onChange={(e) => setName(e.target.value)} id="name" placeholder="Name:" />

                <input type="text" name="email" value={email}
          onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email:" />

                <input type="password" name="password" value={password}
          onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password:" />

                <button  onClick={register}>Create</button>
            </form>
        </div>
    )
}

export default Register;
