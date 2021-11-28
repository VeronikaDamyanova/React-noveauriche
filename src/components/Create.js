import React, { useState, useEffect, Fragment, useContext } from 'react';
import { collection, getDocs, serverTimestamp, doc, setDoc  } from "firebase/firestore"; 
import { db } from '../utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import {AuthContext} from '../contexts/AuthContext';
import { getAuth } from "firebase/auth";


function Create () {
  const { currentUser } = useContext(AuthContext);
  const currentUserId = currentUser ? currentUser.uid : null;

    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setimageURL] = useState('');
    const [author, setAuthor] = useState('');

    const ref = getDocs(collection(db, "articles"));

    //REALTIME GET FUNCTION
    function getArticles() {
    ref.then((querySnapshot) => {
             
            // Loop through the data and store
            // it in array to display
            querySnapshot.forEach(element => {
                var data = element.data();
                setArticles(arr => [...arr , data]);
                  
            });
        })
                // const items = [];
                // ref.forEach((doc) => {
                //     items.push(doc.data());
                // });
                // setArticles(items);
         
    }
    useEffect(() => {
        getArticles();
        // eslint-disable-next-line
    }, []);


    const addArticle = (e) => {
      e.preventDefault()
        const owner = currentUser ? currentUser.uid : 'unknown';
        const author = currentUser ? currentUser.displayName : 'unknown';
        const newArticle = {
          title,
          description,
          imageURL,
          id: uuidv4(),
          owner,
          author,
          createdAt: serverTimestamp(),
          lastUpdate: serverTimestamp(),
        };
         setDoc(doc(db, "articles", newArticle.id), newArticle);
        // ref
        //   .doc(newArticle.id)
        //   .set(newArticle)
        //   .catch((err) => {
        //     console.error(err);
        //   });
      }
    return (
        <section className="create-post">
            <div className="wrapper">

              <form className="create-post-form" onSubmit={addArticle}>
                <input required type="text" value={title} placeholder="Title:" onChange={(e) => setTitle(e.target.value)}/>

                <textarea required value={description} placeholder="Description:" onChange={(e) => setDescription(e.target.value)}/>

                <input required type="text" value={imageURL} placeholder="Image URL:" onChange={(e) => setimageURL(e.target.value)}/>
                
                <button>Create</button>

              </form>
            </div>
        </section>



    )
}

export default Create;