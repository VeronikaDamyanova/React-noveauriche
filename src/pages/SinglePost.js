import React, { useState, useEffect, Fragment, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { doc, getDoc, onSnapshot, deleteDoc, getDocs, collection } from "firebase/firestore";
import { db } from '../utils/firebase';
import {AuthContext} from '../contexts/AuthContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";

const SinglePost = ({history}) => {
    const auth = getAuth();
    const { currentUser, uid } = useContext(AuthContext);   

    var pathArray = window.location.pathname.split('/');
    var articlePath = pathArray.pop();
    const [articleDetails, setArticleDetails] = useState('')
    const [articleComments, setArticleComments] = useState('')

    const thisArticle =  onSnapshot(doc(db, "articles", articlePath), (doc) => {
        setArticleDetails(doc.data())
    });

    // const articleCommentsRef = onSnapshot(doc(db, "articles", articlePath, "comments", "comments"), (doc) => {
    //     setArticleComments(doc.data())
    // });

    const articleCommentsRef = getDocs(collection(db, `articles/${articlePath}/comments`));
    //REALTIME GET FUNCTION
    function getArticleComments() {
    articleCommentsRef.then((querySnapshot) => {
            const items = [];

            querySnapshot.forEach(element => {
                items.push(element.data());
                console.log(element)
            });

            setArticleComments(items)
        })
    }


    // const postComment = (e) => {
    //     e.preventDefault();
    //     doc(db, "articles", articlePath).collection("comments").add({
    //       comment: comment,
    //       username: currentUser.displayName,
    //       commentDate: serverTimestamp(),
    //     });
    //     setComment("");
    //   };

    function deleteArticle() {
        deleteDoc(doc(db, "articles", articlePath))
        history.push('/blog');
    }

    useEffect(() => {
        getArticleComments();
       
    }, []);
    
    // thisArticle()
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
                    
                </div>

                <div className="comments">
                {/* {articleComments[0].map((comment) => (
                     <p>{comment.comment}</p>
                    ))}
                                 */}
                   <p> {articleComments.dateAdded}</p>

                
                </div>

                {currentUser?.uid === articleDetails.owner
                    ?
                    <div className="owner-content">
                        <span className="delete-btn" onClick={deleteArticle}>Delete</span>

                        <NavLink to={`/edit/${articleDetails.id}`}>Edit</NavLink>

                    
                    </div>
                    :''

                }
            </div>
        </section>

        
    )
}

export default SinglePost;