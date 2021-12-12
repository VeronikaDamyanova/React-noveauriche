import React, { useState, useEffect, useContext } from 'react';
import { NavLink } from 'react-router-dom';
import { doc, onSnapshot, deleteDoc, collection, where, query, serverTimestamp, setDoc, orderBy } from "firebase/firestore";
import { db } from '../../utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import {AuthContext} from '../../contexts/AuthContext';
import { getAuth } from "firebase/auth";
import { toast } from 'react-toastify';

const SinglePost = ({history}) => {
    const auth = getAuth();
    const { currentUser, uid } = useContext(AuthContext);   

    var pathArray = window.location.pathname.split('/');
    var articlePath = pathArray.pop();

    const [articleDetails, setArticleDetails] = useState('')
    const [content, setContent] = useState('');
    const [getComments, getArticleComments] = useState([])
    const commentsCollection = collection(db, "comments");
    
    const thisArticle =  onSnapshot(doc(db, "articles", articlePath), (doc) => {
        setArticleDetails(doc.data())
    });

    const addComment = (e) => {
        e.preventDefault()
        const owner = currentUser ? currentUser.uid : 'unknown';
        const author = currentUser ? currentUser.displayName : currentUser.email;
        const forPost = articlePath;
        const dateAdded = "Commented on " + new Date().toLocaleDateString() + " at " + new Date().toLocaleTimeString();
        const newComment = {
          content,
          id: uuidv4(),
          owner,
          author,
          forPost,
          dateAdded,
          createdAt: serverTimestamp()
        };
        setDoc(doc(db, "comments", newComment.id), newComment).then(() => {
            document.getElementById('commentTextarea').innerHTML = "";
            document.getElementById('commentTextarea').value = "";
            toast.success("Your comment is added!", {
                position: toast.POSITION.TOP_CENTER
            })

        }).catch((error) => {
            toast.success(error.code)
        })
    }

    function deleteComment(e) {
        var getCommentId = e.target.id;
        deleteDoc(doc(db, "comments", getCommentId))
    }
    
    function deleteArticle() {
        deleteDoc(doc(db, "articles", articlePath)).then(() => {
            toast.success("The article has been deleted!")
            history.push('/blog');
        }).catch((error) => {
            toast.error(error.code)
        })
    }

    useEffect(() => {
        const relatedComments = query(commentsCollection,  orderBy("createdAt", "desc"), where("forPost", "==", articlePath));
        const unsub = onSnapshot(relatedComments, (snapshot) =>
            getArticleComments(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
        // return unsub;
    
    }, []);

    return (
        <section className="single-post">
            <div className="wrapper">
                <div className="main-content">
                    <span className="category">{articleDetails.category}</span>
                    <h2 className="title">{articleDetails.title}</h2>
                    <hr className="top-line"></hr>
                    <div className="author-wrapper">
                        By <span className="author">{articleDetails.author ? articleDetails.author : articleDetails.authorEmail}</span>
                    </div>
                    <img className="post-image" src={articleDetails.imageURL} />
                    <p className='description'>{articleDetails.description}</p>
                </div>

                <div className="comments">
                    <h3>Comments</h3>
                    
                     {getComments.map((comment) => (  
                        <div key={comment.id} className="comment-box">
                            <div className="info">
                                <h5>{comment.author}</h5>
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