import React, { useState, useEffect, Fragment, useContext } from 'react';
import { collection, getDocs, } from "firebase/firestore"; 
import { db } from '../utils/firebase';
import { v4 as uuidv4 } from 'uuid';

const Blog = ({ }) => {

    const [articles, setArticles] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [imageURL, setimageURL] = useState('');

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
    return (
        <section className="create-post">
            <div className="wrapper">

              <form className="create-post-form">
              <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}/>
              </form>
            </div>
        </section>



    )
}

export default Blog;