import React, { useState, useEffect, Fragment, useContext } from 'react';
import { onSnapshot, serverTimestamp, doc, updateDoc, getDoc  } from "firebase/firestore"; 
import { db } from '../utils/firebase';
import {AuthContext} from '../contexts/AuthContext';

function Edit () {
    var pathArray = window.location.pathname.split('/');
    var articlePath = pathArray.pop();

    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedImageURL, setUpdatedImageURL] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');

    const [currentDetails, getCurrentDetails] = useState('');

    const articleDoc = doc(db, 'articles', articlePath);

        try {
            const getData = async () => {
                const getArticleDoc = await getDoc(articleDoc);
                const getArticleInfo = getArticleDoc.data();
                getCurrentDetails(getArticleInfo)
            }
            
        } catch (err) {
            console.log(err)
        }
    
    useEffect(() => {
        
     
        
     
       
       
    }, []);
    const editArticle = (e) => {
        e.preventDefault()
        const updatedArticle = {
          title: updatedTitle,
          description: updatedDescription,
          imageURL: updatedImageURL,
          category: updatedCategory,
          lastUpdate: serverTimestamp(),
        };
        updateDoc(articleDoc, updatedArticle);      
    }
        
   
 

   
    return (
        <section className="edit-post">
         
            <div className="wrapper">


              <form className="create-post-form" onSubmit={editArticle}>
                <input required type="text" value={updatedTitle} placeholder={currentDetails.title} onChange={(e) => setUpdatedTitle(e.target.value)}/>

                <textarea required value={updatedDescription} placeholder={currentDetails.description} onChange={(e) => setUpdatedDescription(e.target.value)}/>

                <input required type="text" value={updatedImageURL} placeholder={currentDetails.imageURL} onChange={(e) => setUpdatedImageURL(e.target.value)}/>
            
                <select required placeholder="Category:" value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)}>
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