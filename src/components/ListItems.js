import React from 'react'
import ReactDOM from 'react-dom'
import { useState } from 'react';

import { BrowserRouter as Router, Routes, Route, Link, NavLink, useParams, BrowserRouter } from 'react-router-dom'
import { auth } from '../firebase.js'
import { onAuthStateChanged, signOut } from 'firebase/auth'

function ListItems() {
 
  const logout = async () => {
    await signOut(auth);
  }
    return (
        
        <div>
        
        <ul className="list-items">
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/about">About</NavLink></li>
        <li><NavLink to="/fashion">Blogs</NavLink></li>
        <li><NavLink to="/designers">Designers</NavLink></li>
        <li><NavLink to="/profile">Profile</NavLink></li>
        <li><NavLink to="/" onClick={logout}>Logout</NavLink></li>

      </ul>


      </div>


  
    
    )
}

export default ListItems;