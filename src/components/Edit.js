import React, { useState, useEffect, Fragment, useContext } from 'react';
import { onSnapshot, serverTimestamp, doc, updateDoc, getDoc, collection  } from "firebase/firestore"; 
import { db } from '../utils/firebase';
import {AuthContext} from '../contexts/AuthContext';

const Edit = ({
  history
}) =>  {
    var pathArray = window.location.pathname.split('/');
    var articlePath = pathArray.pop();

    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedImageURL, setUpdatedImageURL] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');

    const [currentDetails, getCurrentDetails] = useState('');

    const articleDoc = doc(db, 'articles', articlePath);


    const thisArticle =  onSnapshot(doc(db, "articles", articlePath), (doc) => {
      getCurrentDetails(doc.data()) 
  });

    
    const editArticle = (e) => {
        e.preventDefault()
        updateDoc(articleDoc, {
      
          title: updatedTitle,
          description: updatedDescription,
          imageURL: updatedImageURL,
          category: updatedCategory,
          lastUpdate: serverTimestamp(),
        }).then(res => {
         
      })

      .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
        thisArticle();

        // updateDoc(articleDoc, updatedArticle);  
        history.push('/blog');

    }
        
   
 

   
    return (
        <section className="edit-post">
         
            <div className="wrapper">


              <form className="create-post-form" onSubmit={editArticle}>
                <input  type="text" value={updatedTitle} placeholder={currentDetails.title} onChange={(e) => setUpdatedTitle(e.target.value)}/>

                <textarea  value={updatedDescription} placeholder={currentDetails.description} onChange={(e) => setUpdatedDescription(e.target.value)}/>

                <input  type="text" value={updatedImageURL} placeholder={currentDetails.imageURL} onChange={(e) => setUpdatedImageURL(e.target.value)}/>
            
                <select  placeholder="Category:" value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)}>
                  <option value="Fashion">Fashion</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Designers">Designers</option>
                </select>
                <button>Edit</button>

              </form>
            </div>
        </section>



    )
}

export default Edit;