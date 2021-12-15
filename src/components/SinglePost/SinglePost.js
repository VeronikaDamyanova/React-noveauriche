import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { doc, onSnapshot, deleteDoc, collection, where, query, serverTimestamp, setDoc, orderBy } from "firebase/firestore";
import { db } from '../../utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import {AuthContext} from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

import './SinglePost.css';

const SinglePost = ({history}) => {
    const { currentUser } = useContext(AuthContext);   

    var pathArray = window.location.pathname.split('/');
    var articlePathID = pathArray.pop();

    const [articleDetails, setArticleDetails] = useState('')
    const [content, setContent] = useState('');
    const [getComments, getArticleComments] = useState([])
    const commentsCollection = collection(db, "comments");
    
    const thisArticle =  onSnapshot(doc(db, "articles", articlePathID), (doc) => {
        setArticleDetails(doc.data())
    });

    const addComment = (e) => {
        e.preventDefault()
        const owner = currentUser ? currentUser.uid : 'unknown';
        const author = currentUser ? currentUser.displayName : currentUser.email;
        const authorEmail = currentUser ? currentUser.email : '';

        const forPost = articlePathID;
        const dateAdded = "Commented on " + new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString();
        const newComment = {
          content,
          id: uuidv4(),
          owner,
          author,
          authorEmail,
          forPost,
          dateAdded,
          createdAt: serverTimestamp()
        };

        //Add the comment to the database and reset the field, value and state
        setDoc(doc(db, "comments", newComment.id), newComment).then(() => {
            document.getElementById('commentTextarea').innerHTML = "";
            document.getElementById('commentTextarea').value = "";
            setContent('')
        }).catch((error) => {
            toast.error(error.code)
        })
    }


    function deleteArticle() {
        deleteDoc(doc(db, "articles", articlePathID)).then(() => {
            history.push('/blog');

            toast.success("The article has been deleted!")
        }).catch((error) => {
            toast.error(error.code)
        })
    }

    function deleteComment(e) {
        var getCommentId = e.target.id;
        e.target.parentNode.style.display = 'none';
        deleteDoc(doc(db, "comments", getCommentId))
    }
    

    useEffect(() => {
        //get only the comments from the collection that are for the specific post/article id and order them by creation date
        const relatedCommentsFilter = query(commentsCollection,  orderBy("createdAt", "desc"), where("forPost", "==", articlePathID));

        //Get comments and updates in realtime
        const relatedComments = onSnapshot(relatedCommentsFilter, (snapshot) =>
            getArticleComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
        // return relatedComments;
    
    }, []);

  
    return (
        <section className="single-post">
            <div className="wrapper">
                <div className="main-content">
                    <span className="category">{articleDetails?.category}</span>
                    <span className="dateAdded">Published <i>{articleDetails.dateAdded}</i></span>
                    <h2 className="title">{articleDetails.title}</h2>
                    <hr className="top-line"></hr>
                    <div className="author-wrapper">
                        By <span className="author">{articleDetails.author ? articleDetails.author : articleDetails.authorEmail}</span>
                    </div>
                    <img className="post-image" src={articleDetails.imageURL} alt='post'/>
                    <p className='description'>{articleDetails.description}</p>
                </div>

                <div className="comments">
                    <h3>Comments</h3>
                    
                     {getComments.map((comment) => (  
                        <div key={comment.id} className="comment-box">
                            <div className="info">
                                <h5>{comment.author ? comment.author : comment.authorEmail}</h5>
                                <span>{comment.dateAdded}</span>
                            </div>
                        
                            <p>{comment.content}</p>

                            {currentUser?.uid === comment.owner
                                ?
                                    <span className="delete-comment" id={comment.id} onClick={deleteComment}>Delete comment</span>
                                : ''
                            }   
                        </div> 
                    ))}
                             
                    <div className="add-comment-wrapper">
                        <form className="comment-form" onSubmit={addComment}>
                            <textarea id='commentTextarea' rows="6" required type="text" value={content} placeholder="Comment:" onChange={(e) => setContent(e.target.value)} />

                            <button>Add comment</button>
                        </form>
                    </div>
                </div>

                {currentUser?.uid === articleDetails.owner
                    ?
                    <div className="owner-content">
                        <span className="delete-btn" onClick={deleteArticle}>Delete</span>

                        <NavLink to={`/edit/${articleDetails.id}`}>Edit</NavLink>
                    </div>
                    : ''
                }
            </div>
        </section>

    )
}

export default SinglePost;