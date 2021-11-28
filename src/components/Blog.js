import React, { useState, useEffect, Fragment, useContext } from 'react';
import { collection, getDocs, query, where } from "firebase/firestore"; 
import { db } from '../utils/firebase';
import { v4 as uuidv4 } from 'uuid';
import { NavLink } from 'react-router-dom';

const Blog = ({ }) => {
    const [articles, setArticles] = useState([]);
    const ref = getDocs(collection(db, "articles"));
    const [category, setCategory] = useState([]);

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
    }

    
    useEffect(() => {
        getArticles();
    }, []);

    function toggleCategories(cat) {
        setCategory('')
        setCategory(cat)
        console.log(category)   

    }

        // let getArticleCard = document.getElementsByClassName('blog-card').getAttribute('category')
        // if (getArticleCard !== category) {
        //     this.hide()
        // }
    return (
        <section className="latest-posts">
            <div className="wrapper">
                <div className="categories">
                    <span >All</span>
                    <span value="Fashion" onClick={(e) => toggleCategories(e.target.getAttribute("value"))}>Fashion</span>
                    <span value="Lifestyle" onClick={(e) => toggleCategories(e.target.getAttribute("value"))}>Lifestyle</span>
                    <span value="Designers" onClick={(e) => toggleCategories(e.target.getAttribute("value"))}>Designers</span>

                  

                </div>
                {articles.map((article) => (
                    <NavLink to={`single-post/${article.id}`} className="blog-card" category={article.category} id={article.id} key={article.id}>
                        <div className="img-wrap">
                            <img src={article.imageURL} alt="about us image" />
                        </div>

                        <div className="content">
                            
                            <span className="category">{article.category}</span>
                            <h4>{article.title}</h4>
                            <p>{article.description}</p>

                            <hr />

                            <div className="authorWrap">
                                By <span className="author">{article.author}</span>
                            </div>
                        </div>
                    </NavLink>
                ))}
            </div>
        </section>



    )
}

export default Blog;