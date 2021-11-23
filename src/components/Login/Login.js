import React from 'react'
import { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";

import { getAuth } from "firebase/auth";
export const auth = getAuth();
// export const auth = getAuth();
const Login = ({
    history
}) => {
    const onLoginFormSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;

        console.log(email, password);

        signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                history.push('/');
      
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
              });
    };
  
  
    return (
        <div className="login-register-page">
            <form onSubmit={onLoginFormSubmitHandler}>
                <h2>Login</h2>

                <input type="text" name="email" id="email" placeholder="Email:"/>

                <input type="password" name="password" id="password" placeholder="password:" />

                <button>Login</button>
            </form>

        </div>
    )
}

export default Login;
