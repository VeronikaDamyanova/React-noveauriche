import ListItems from './ListItems';
import { NavLink } from 'react-router-dom'
import { useEffect, useContext } from 'react';
import {AuthContext} from '../contexts/AuthContext';
import { getAuth } from "firebase/auth";
export const auth = getAuth();
const Header = () => {
    const { isAuthenticated, email } = useContext(AuthContext);
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <header>
                <nav className="header-container">
                <NavLink to="/" className="logo-nav"><img src="./images/logo.png" alt="blabla" /></NavLink>
                    {/* <ListItems></ListItems> */}
                    <div>

                        <ul className="list-items">
                            <li><NavLink to="/">Home</NavLink></li>
                            <li><NavLink to="/about">About</NavLink></li>

                            <li><NavLink to="/designers">Designers</NavLink></li>
                            <li><NavLink to="/profile">Profile</NavLink></li>
                            {currentUser
                            ? 
                            <>
                                <li><NavLink to="/blog">Blog</NavLink></li>
                                <li><NavLink to="/create"><i className="fas fa-sign-out-alt"></i>Create</NavLink></li>
                                <li><NavLink to="/logout"><i className="fas fa-sign-out-alt"></i>Logout</NavLink></li>
                            </>
                          
                            : <>
                                <li><NavLink to="/login">Login</NavLink></li>
                                <li><NavLink to="/register">Register</NavLink></li>
                            </>

                        }
                        </ul>
                       
                        {currentUser
                            ? <li>Welcome, {currentUser.email}!</li>
                            : <li>Welcome, Guest</li>
                        }
                       
                    </div>


                 
                </nav>
            </header>
        </>
    )


}
export default Header;