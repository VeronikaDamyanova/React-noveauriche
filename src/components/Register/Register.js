
import { collection, addDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, signOut  } from "firebase/auth";
export const auth = getAuth();

const Register = ({
    history
}) => {
    const onRegisterSubmitHandler = (e) => {
        e.preventDefault();

        const email = e.target.email.value;
        const password = e.target.password.value;
          
        createUserWithEmailAndPassword(auth, email, password)
            .then(userCredential => {
                // addDoc(collection(db, "users")
                console.log('Register');

                signOut(auth)
                history.push('/login');
        
            });
    }

 
    
    return (
        <div className="login-register-page">
            <form onSubmit={onRegisterSubmitHandler}>
                <h2>Register User</h2>

                {/* <input type="text" id="username" placeholder="Name:" onChange={(event) => {
                    setRegisterName(event.target.value)
                }} /> */}

                <input type="text" name="email" id="email" placeholder="Email:" />

                <input type="password" name="password" id="password" placeholder="Password:" />
                {/* <input type="password" id="userRepeatPass" placeholder="Repeat Password:" /> */}


                <button >Create</button>
            </form>
        </div>
    )
}

export default Register;
