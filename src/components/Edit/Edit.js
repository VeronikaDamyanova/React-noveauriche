import React, { useState} from 'react';
import { onSnapshot, serverTimestamp, doc, updateDoc } from "firebase/firestore"; 
import { db } from '../../utils/firebase';
import { toast } from 'react-toastify';

const Edit = ({
  history
}) =>  {
    var pathArray = window.location.pathname.split('/');

    //Get the id of the article from the url
    var articlePathID = pathArray.pop();

    const [updatedTitle, setUpdatedTitle] = useState('');
    const [updatedDescription, setUpdatedDescription] = useState('');
    const [updatedImageURL, setUpdatedImageURL] = useState('');
    const [updatedCategory, setUpdatedCategory] = useState('');

    const [currentDetails, getCurrentDetails] = useState('');

    //Get the correct document by targeting it with the id taken from the url
    const articleDoc = doc(db, 'articles', articlePathID);

    const thisArticle =  onSnapshot(doc(db, "articles", articlePathID), (doc) => {
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
    }).then(() => {
      toast.success("Your article is updated!", {
        position: toast.POSITION.TOP_CENTER
      })

    }).catch ((error) => {
      toast.error(error.code);
    })
  
    history.push('/blog')
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
            <input required type="text" value={updatedTitle} placeholder={currentDetails.title} name='title' onChange={(e) => setUpdatedTitle(e.target.value)}/>

            <textarea required rows="6" value={updatedDescription} placeholder={currentDetails.description} name='description' onChange={(e) => setUpdatedDescription(e.target.value)}/>

            <input required type="text" value={updatedImageURL} placeholder={currentDetails.imageURL} name='imageURL' onChange={(e) => setUpdatedImageURL(e.target.value)}/>
        
            <select required value={updatedCategory} onChange={(e) => setUpdatedCategory(e.target.value)}>
              <option disabled></option>
              <option value="Fashion">Fashion</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Designers">Designers</option>
            </select>
            
            <button>Edit</button>
          </form>

          <div className="image-box">
            <img src="../images/balenciaga-bag.jpg" alt='edit'></img>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Edit;