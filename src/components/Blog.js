import React, { useState, useEffect, Fragment, useContext } from 'react';
import { collection, getDocs, } from "firebase/firestore"; 
import { db } from '../utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';

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
            const items = [];

            querySnapshot.forEach(element => {
                items.push(element.data());

                // setArticles(arr => [...arr , data]);
                  console.log(element)
            });

            setArticles(items)
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
        <section className="latest-posts">
            <div className="wrapper">

                {articles.map((article) => (
                    <NavLink to={`single-post/${article}`} className="blog-card" id={article.id} key={article.id}>
                        <div className="img-wrap">
                            <img src={article.imageURL} alt="about us image" />
                        </div>

                        <div className="content">
                            
                            <span className="category">Runway</span>
                            <h4>{article.title}</h4>
                            <p>{article.description}</p>

                            <hr />

                            <div className="authorWrap">
                                By <span className="author">Veronika Damyanova</span>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </section>



    )
}

export default Blog;