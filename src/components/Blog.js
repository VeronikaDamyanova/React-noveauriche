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
            const items = [];

            querySnapshot.forEach(element => {
                items.push(element.data());
                console.log(element)
            });

            setArticles(items)
        })
    }

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

    

    // async function toggleCategories(cat) {
    //     if(document.querySelectorAll('.blog-card').getAttribute('category') !== cat) {
    //         console.log('test')
    //         console.log(this)
    //     }
    //  }

    
  
        



    
    useEffect(() => {
        getArticles();
       
    }, []);

 

        // let getArticleCard = document.getElementsByClassName('blog-card').getAttribute('category')
        // if (getArticleCard !== category) {
        //     this.hide()
        // }
    return (
        <section className="blog">
            <div className="wrapper">
                <div className="categories">
                    <span className="category" category="all" onClick={(e) => toggleCategories(e.target.getAttribute('category'))}>All</span>
                    {articles.map((article) => (
                        article.category 
                        ? 
                        <span className="category" category={article.category} onClick={(e) => toggleCategories(article.category)}>{article.category}</span>
                        : ''
                    ))}
                </div>

                <div className="blog-posts">
                    {articles.map((article) => (
                        <NavLink to={`single-post/${article.id}`} key={article.id} className="blog-card" category={article.category} id={article.id} key={article.id}>
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
              
            </div>
        </section>



    )
}

export default Blog;