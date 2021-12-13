import React from 'react';
import { BrowserRouter, Route, Redirect } from 'react-router-dom';
import './App.css';
import { toast, ToastContainer, Zoom } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import About from './components/About/About';
import Home from './components/Home/Home';
import {AuthProvider} from './contexts/AuthContext';
import { getAuth } from "firebase/auth";
import SinglePost from './components/SinglePost/SinglePost';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Register from './components/Register/Register';
import Login from './components/Login/Login';
import Blog from './components/Blog/Blog';
import Create from './components/Create/Create';
import Edit from './components/Edit/Edit';
import MyPosts from './components/MyPosts/MyPosts';
export const auth = getAuth();

function App() { 
  return (
    <AuthProvider>

    <BrowserRouter>
      <div className="App">
        <Header></Header>
        <ToastContainer transition={Zoom} autoClose={2000}/>

        <Route exact path="/" component={Home } />
        <Route path="/about" component={About} />
        <Route path="/blog" component={Blog} />
        <Route path="/my-posts" component={MyPosts} />
        <Route path="/create" component={Create} />
        <Route path="/edit" component={Edit} />
        <Route path="/single-post" component={SinglePost} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/logout" render={() => {
            auth.signOut();
            toast.success("Logged out!", {
              
            })
            return <Redirect to="/login" />
          }} />

        <Footer></Footer>
      </div>
    </BrowserRouter>
    </AuthProvider>

  );
}

export default App;
