import { NavLink } from 'react-router-dom'
import { useContext } from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import { getAuth } from "firebase/auth";
export const auth = getAuth();
const Header = () => {
    const { currentUser } = useContext(AuthContext);

    return (
        <>
            <header>
                <nav className="header-container">
                <NavLink to="/" className="logo-nav"><img src="./images/logo.png" alt="logo" /></NavLink>
                    <div>

                        <div className="list-items">
                            <div><NavLink to="/">Home</NavLink></div>
                            <div><NavLink to="/about">About</NavLink></div>

                            <div><NavLink to="/designers">Designers</NavLink></div>
                            <div><NavLink to="/profile">Profile</NavLink></div>
                            {currentUser
                            ? 
                            <>
                                <div><NavLink to="/blog">Blog</NavLink></div>
                                <div><NavLink to="/create"><i className="fas fa-sign-out-alt"></i>Create</NavLink></div>
                                <div><NavLink to="/logout"><i className="fas fa-sign-out-alt"></i>Logout</NavLink></div>
                            </>
                          
                            : <>
                                <div><NavLink to="/login">Login</NavLink></div>
                                <div><NavLink to="/register">Register</NavLink></div>
                            </>

                        }
                        </div>
                       
                        {currentUser
                            ? <div>Welcome, {currentUser.email}!</div>
                            : <div>Welcome, Guest</div>
                        }
                       
                    </div>


                 
                </nav>
            </header>
        </>
    )


}
export default Header;