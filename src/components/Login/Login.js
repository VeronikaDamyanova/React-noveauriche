import React from 'react'
import { signInWithEmailAndPassword } from "firebase/auth";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getAuth } from "firebase/auth";
export const auth = getAuth();
const Login = ({
    history
}) => {
    const onLoginFormSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
       
        if (!email) {
            toast.warn("Please enter your email !", {
            })

        } else if (!password) {
            toast.warn("Please enter your password !", {
            })
        } 

        if(email && password) {
            signInWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                toast.success("Successfully Logged In!", {
                    position: toast.POSITION.TOP_CENTER
                })
                history.push('/');
            })
            .catch((error) => {
                toast.error(error.code);
            });
        }
      
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
