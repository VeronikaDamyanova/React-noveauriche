
import React, { useState, useEffect, Fragment, useContext } from 'react';

import { collection, addDoc, doc, setDoc } from "firebase/firestore"; 
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
              const res = await createUserWithEmailAndPassword(auth, email, password); 
            
              const user = res.user;

              const newUser = {
                uid: user.uid,
                name,
                email,
                likedArticles: [],
              };
            

              setDoc(doc(db, "users", newUser.uid), newUser);
              updateProfile(auth.currentUser, {
                displayName: name
              })
              signOut(auth)
              history.push('/login');
            } catch (err) {
              console.error(err);
              alert(err.message);
            }
          };

          const register = (e) => {            
            e.preventDefault()

            if (!name) alert("Please enter name");
            registerWithEmailAndPassword(name, email, password);
            

          };
        // createUserWithEmailAndPassword(auth, email, password)
        //     .then(userCredential => {
        //         // addDoc(collection(db, "users")
        //         console.log('Register');
        //         console.log(userCredential);

        //         const newUser = {
        //             email: email,
        //             id: userCredential.uid,
        //             password: password,
        //             likedPosts: [],
        //           };
        //         setDoc(doc(db, "users", newUser.id), newUser);

        //         // signOut(auth)
        //         // history.push('/login');
        
        //     });
    

 
    
    return (
        <div className="login-register-page">
            <form >
                <h2>Register User</h2>

                {/* <input type="text" id="username" placeholder="Name:" onChange={(event) => {
                    setRegisterName(event.target.value)
                }} /> */}
                <input type="text" name="name"  value={name}
          onChange={(e) => setName(e.target.value)} id="name" placeholder="Name:" />

                <input type="text" name="email" value={email}
          onChange={(e) => setEmail(e.target.value)} id="email" placeholder="Email:" />

                <input type="password" name="password" value={password}
          onChange={(e) => setPassword(e.target.value)} id="password" placeholder="Password:" />
                {/* <input type="password" id="userRepeatPass" placeholder="Repeat Password:" /> */}


                <button  onClick={register}>Create</button>
            </form>
        </div>
    )
}

export default Register;
