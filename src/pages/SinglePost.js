import React, { useState, useEffect, Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { db } from '../utils/firebase';
import {AuthContext} from '../contexts/AuthContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SinglePost = ({}) => {
    const auth = getAuth();
    const { currentUser, uid } = useContext(AuthContext);

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
                    <span className="category">{articleDetails.category}</span>
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

                {currentUser?.uid === articleDetails.owner
                    ?
                    <div className="owner-content">

                        <NavLink to={`/edit/${articleDetails.id}`}>Edit</NavLink>
                    
                    </div>
                    :''

                }
            </div>
        </section>

        
    )
}

export default SinglePost;