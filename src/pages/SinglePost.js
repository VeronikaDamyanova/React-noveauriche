import React, { useState, useEffect, Fragment, useContext } from 'react';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../utils/firebase';
import {AuthContext} from '../contexts/AuthContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SinglePost = ({}) => {
    const auth = getAuth();
    var uid;
    onAuthStateChanged(auth, (user) => {
        if (user) {
          // User is signed in, see docs for a list of available properties
          // https://firebase.google.com/docs/reference/js/firebase.User
           uid = user.uid;
          // ...
        } else {
          // User is signed out
          // ...
        }
    })

    var pathArray = window.location.pathname.split('/');
    var articlePath = pathArray.pop();
    const [articleDetails, setArticleDetails] = useState('')

    const thisArticle =  onSnapshot(doc(db, "articles", articlePath), (doc) => {
        setArticleDetails(doc.data())

    });
    

    return (
        <section className="single-post">
            <div className="wrapper">
                <div className="main-content">
                    <span className="category">Raleway</span>
                    <h2 className="title">{articleDetails.title}</h2>
                    <hr className="top-line"></hr>
                    <div className="author-wrapper">
                        By <span className="author">{articleDetails.author}</span>
                    </div>
                    <img className="post-image" src={articleDetails.imageURL} />

                    <p className="content">
                    {articleDetails.description}
                    </p>
                </div>

                {uid === articleDetails.owner
                    ?
                    <div className="owner-content">

                        <a href="">Edit Post</a>
                    
                    </div>
                    : <h2>test</h2>

                }
            </div>
        </section>

        
    )
}

export default SinglePost;