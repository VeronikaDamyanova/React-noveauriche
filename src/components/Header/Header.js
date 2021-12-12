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
                <NavLink to="/" className="logo-nav"><img src="../images/logo.png" alt="logo" /></NavLink>
                    <div>

                        <div className="list-items">
                            <div><NavLink exact to="/">Home</NavLink></div>
                            <div><NavLink to="/about">About</NavLink></div>
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
                            ? <div className='welcome-msg'>Welcome, <span>{currentUser.email}</span>!</div>
                            : <div className='welcome-msg'>Welcome, <span>Guest</span></div>
                        }
                       
                    </div>


                 
                </nav>
            </header>
        </>
    )


}
export default Header;