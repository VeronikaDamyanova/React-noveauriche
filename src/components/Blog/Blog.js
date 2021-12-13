import React, { useState, useEffect } from 'react';
import { collection, getDocs} from "firebase/firestore"; 
import { db } from '../../utils/firebase';
import { NavLink } from 'react-router-dom';

import './Blog.css';

const Blog = () => {

    const [articles, setArticles] = useState([]);
    const articleDocs = getDocs(collection(db, "articles"));

    //Get articles in real time
    function getArticles() {
        articleDocs.then((querySnapshot) => {
            const items = [];

            querySnapshot.forEach(element => {
                items.push(element.data());
            });

            setArticles(items)
        })
    }

    //Category toggle function
    function toggleCategories(cat) {
        var getBlogCards = document.querySelectorAll('.blog-card')
        getBlogCards.forEach(card => {
            if(card.getAttribute('category') !== cat && cat !== 'all') {
                card.classList.toggle('hidden')
            } else if (cat === 'all') {
                card.classList.remove('hidden')
            }
        })
    }
    
    useEffect(() => {
        getArticles();
       
    }, []);

    
    var categoriesArray = []

    //Get the categories from all posts from the state (article) and add them to the empty array
    articles.map((article) => {
        categoriesArray.push(article.category)
    })

    //Filter through the array and get only the unique categories (no duplicates)
    let uniqueCategories = categoriesArray.filter((cat, index) => {
        return categoriesArray.indexOf(cat) === index;
    });
    
    return (
        <section className="blog">
            <div className="wrapper">
                <div className="categories">
                    <span className="category" category="all" onClick={(e) => toggleCategories(e.target.getAttribute('category'))}>All</span>
                    {uniqueCategories.map((category) => (
                      category 
                        ? 
                        <span key={category} className="category" category={category} onClick={(e) => toggleCategories(category)}>{category}</span>
                        : ''
                    ))}
                </div>

                <div className="blog-posts">
                    {articles.map((article) => (
                        <NavLink to={`single-post/${article.id}`} className="blog-card" category={article.category} id={article.id} key={article.id}>
                            <div className="img-wrap">
                                <img src={article.imageURL} alt="article" />
                            </div>

                            <div className="content">
                                
                                <span className="category">{article.category}</span>
                                <h4>{article.title}</h4>
                                <p>{article.description}</p>

                                <hr />

                                <div className="authorWrap">
                                    By <span className="author">{article.author ? article.author : article.authorEmail}</span>
                                </div>
                            </div>
                        </NavLink>
                    ))}
                </div>
              
            </div>
        </section>



    )
}

export default Blog;