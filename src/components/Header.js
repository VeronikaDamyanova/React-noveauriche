import ListItems from './ListItems';
import { NavLink } from 'react-router-dom'
import { useEffect, useContext } from 'react';
import AuthContext from '../contexts/AuthContext';
import { getAuth } from "firebase/auth";
export const auth = getAuth();
const Header = () => {
    const { isAuthenticated, email } = useContext(AuthContext);

    useEffect(() => {
        if (!isAuthenticated) {
            return;
        }

        auth.currentUser.getIdToken()
            // .then(function (idToken) {
            //     return fetch('http://localhost:5001', {
            //         headers: {
            //             'Authorization': idToken
            //         }
            //     })
            // })
            // .then(res => res.json())
            .then(data => {
                console.log(data);
            });


    }, [isAuthenticated])

    return (
        <>
            <header>
                <nav className="header-container">
                    <div className="logo-nav"><img src="../logo.png" alt="blabla" /></div>
                    {/* <ListItems></ListItems> */}
                    <div>

                        <ul className="list-items">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>

                            <li><NavLink to="/fashion">Blogs</NavLink></li>
                            <li><NavLink to="/designers">Designers</NavLink></li>
                            <li><NavLink to="/profile">Profile</NavLink></li>
                            {isAuthenticated
                            ? <NavLink to="/logout"><i className="fas fa-sign-out-alt"></i> Logout</NavLink>
                            : <>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Register</NavLink></li>
                            </>

                        }
                        </ul>
                       
                        {isAuthenticated
                            ? <li>Welcome, {email}!</li>
                            : <li>Welcome, Guest</li>
                        }
                       
                    </div>


                 
                </nav>
            </header>
        </>
    )


}
export default Header;