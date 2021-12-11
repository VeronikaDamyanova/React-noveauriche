import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs, serverTimestamp, doc, setDoc } from "firebase/firestore";
import { db } from '../../utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { AuthContext } from '../../contexts/AuthContext';


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

      // Loop through the data and store it in array to display
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
    e.preventDefault()
    const owner = currentUser ? currentUser.uid : 'unknown';
    const author = currentUser ? currentUser.displayName : currentUser.email;
    const newArticle = {
      title,
      description,
      imageURL,
      category,
      id: uuidv4(),
      owner,
      author,
      createdAt: serverTimestamp(),
      lastUpdate: serverTimestamp(),
    };
    setDoc(doc(db, "articles", newArticle.id), newArticle);
    history.push('/blog')
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
              <option value="Fashion">Fashion</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Designers">Designers</option>
            </select>
            <button>Create</button>

          </form>

          <div className="image-box">
            <img src="./images/balenciaga-bag.jpg"></img>
          </div>

        </div>


      </div>
    </section>



  )
}

export default Create;