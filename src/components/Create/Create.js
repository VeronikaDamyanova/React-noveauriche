import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from '../../utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

import './Create.css';

const Create = ({ history }) => {
  const { currentUser } = useContext(AuthContext);

  const [articles, setArticles] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageURL, setimageURL] = useState('');
  const [category, setCategory] = useState('');

  const ref = getDocs(collection(db, "articles"));

 function getArticles() {
    ref.then((querySnapshot) => {

      // Loop through the data and add it to the useState
      querySnapshot.forEach(element => {
        var data = element.data();
        setArticles(arr => [...arr, data]);

      });
    })
  }

  useEffect(() => {
    getArticles();
  }, []);


  const addArticle = (e) => {
    e.preventDefault();
   
    const owner = currentUser ? currentUser.uid : 'unknown';
    const author = currentUser ? currentUser.displayName : currentUser.email;
    const dateAdded = new Date().toLocaleDateString();
    const authorEmail = currentUser.email
    const newArticle = {
      title,
      description,
      imageURL,
      category,
      dateAdded,
      id: uuidv4(),
      owner,
      author,
      authorEmail,
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };

    //Create new article/post
    setDoc(doc(db, "articles", newArticle.id), newArticle).then(() => {
      toast.success("Your article is published!", {
        position: toast.POSITION.TOP_CENTER
      })
      history.push('/blog')

    }).catch ((error) => {
      toast.error(error.code);
    })
  }

  return (
    <section className="create-edit-post">
      <div className="wrapper">
        <h2>Create Post </h2>
        <h5>Please fill all the fields before submitting!</h5>

        <div className="boxes">
          <form className="create-edit-post-form" onSubmit={addArticle}>
            <input required type="text" value={title} placeholder="Title:" onChange={(e) => setTitle(e.target.value)} />

            <textarea rows="6" required value={description} placeholder="Description:" onChange={(e) => setDescription(e.target.value)} />

            <input required type="text" value={imageURL} placeholder="Image URL:" onChange={(e) => setimageURL(e.target.value)} />

            <select required placeholder="Category:" value={category} onChange={(e) => setCategory(e.target.value)}>
              <option disabled></option>
              <option value="Fashion">Fashion</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Designers">Designers</option>
            </select>
            <button>Create</button>

          </form>

          <div className="image-box">
            <img src="./images/balenciaga-bag.jpg" alt='create'></img>
          </div>

        </div>


      </div>
    </section>



  )
}

export default Create;