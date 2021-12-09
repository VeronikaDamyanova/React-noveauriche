import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import About from './pages/About';
import Home from './pages/Home';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SinglePost from './pages/SinglePost';
import Header from './components/Header';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Blog from './components/Blog';
import {AuthProvider} from './contexts/AuthContext';
import isAuth from './hoc/isAuth';

import { getAuth } from "firebase/auth";
import Create from './components/Create';
import Edit from './components/Edit';
export const auth = getAuth();

function App() {
  

 
  return (
    <AuthProvider>

    <BrowserRouter>
      <div className="App">
        {/* <ToastContainer position="top-center"/> */}

        <Header></Header>

     
          <Route exact path="/" component={Home } />
          <Route path="/about" component={About} />
          <Route path="/blog" component={Blog} />
          <Route path="/create" component={Create} />
          <Route path="/edit" component={Edit} />

          <Route path="/single-post" component={SinglePost} />
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          <Route path="/logout" render={() => {
              auth.signOut();
              return <Redirect to="/login" />
            }} />
          {/* <Route path="/logout" onClick={logout} /> */}


        <footer>
          <div className="footer-container">
            <p> All rights reserved NoveauRiche 2021 &copy; </p>
          </div>
        </footer>


      </div>
    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
