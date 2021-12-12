import React, { useState} from 'react';
import { onSnapshot, serverTimestamp, doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../utils/firebase';
import { toast } from 'react-toastify';

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
        if (updatedTitle !== currentDetails.title && updatedTitle !== '') {
          updateDoc(articleDoc, {
            title: updatedTitle,
            lastUpdate: serverTimestamp(),
          }).then(() => {
            toast.success("Your article is updated!", {
              position: toast.POSITION.TOP_CENTER
            })  
            history.push('/blog');
    
          }).catch ((error) => {
            toast.error(error.code);
          })
        } else if (updatedDescription !== currentDetails.description && updatedDescription !== '') {
          updateDoc(articleDoc, {
            description: updatedDescription,
            lastUpdate: serverTimestamp(),
          }).then(() => {
            toast.success("Your article is updated!", {
              position: toast.POSITION.TOP_CENTER
            })  
            history.push('/blog');
    
          }).catch ((error) => {
            toast.error(error.code);
          })
        } else if (updatedImageURL !== currentDetails.imageURL && updatedImageURL !== '') {
          updateDoc(articleDoc, {
            imageURL: updatedImageURL,
            lastUpdate: serverTimestamp(),
          }).then(() => {
            toast.success("Your article is updated!", {
              position: toast.POSITION.TOP_CENTER
            })   
            history.push('/blog');
   
          }).catch ((error) => {
            toast.error(error.code);
          })
        }
        else if (updatedCategory !== currentDetails.category && updatedCategory !== '') {
          updateDoc(articleDoc, {
            category: updatedCategory,
            lastUpdate: serverTimestamp(),
          }).then(() => {
            toast.success("Your article is updated!", {
              position: toast.POSITION.TOP_CENTER
            })      
            history.push('/blog');

          }).catch ((error) => {
            toast.error(error.code);
          })
        }
         else if (updatedTitle == '' && updatedDescription == '' && updatedImageURL == '' && updatedCategory == '') {
          toast.warn('You need to update atleast one of the fields.')
        }

        // updateDoc(articleDoc, {
      
        //   title: updatedTitle,
        //   description: updatedDescription,
        //   imageURL: updatedImageURL,
        //   category: updatedCategory,
        //   lastUpdate: serverTimestamp(),
        // }).then(() => {
        //   toast.success("Your article is published!", {
        //     position: toast.POSITION.TOP_CENTER
        //   })
        //   history.push('/blog')
    
        // }).catch ((error) => {
        //   toast.error(error.code);
        // })
        thisArticle();

        // updateDoc(articleDoc, updatedArticle);  

    }
        
   
 

   
    return (
        <section className="create-edit-post">
         
            <div className="wrapper">

              <h2>Edit Post </h2>
              <h5>Please fill all the fields before submitting!</h5>

            <div className="boxes">
              <form className="create-edit-post-form" onSubmit={editArticle}>
                <input type="text" value={updatedTitle} placeholder={currentDetails.title} name='title' onChange={(e) => setUpdatedTitle(e.target.value)}/>

                <textarea rows="6" value={updatedDescription} placeholder={currentDetails.description} name='description' onChange={(e) => setUpdatedDescription(e.target.value)}/>

                <input  type="text" value={updatedImageURL} placeholder={currentDetails.imageURL} name='imageURL' onChange={(e) => setUpdatedImageURL(e.target.value)}/>
            
                <select placeholder={currentDetails.category} value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)}>
                  <option value="Fashion">Fashion</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Designers">Designers</option>
                </select>
                <button>Edit</button>

              </form>

              <div className="image-box">
                <img src="../images/balenciaga-bag.jpg"></img>
              </div>
              </div>

              

            </div>
        </section>



    )
}

export default Edit;