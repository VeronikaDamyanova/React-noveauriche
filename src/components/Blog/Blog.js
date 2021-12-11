import React, { useState, useEffect, useContext } from 'react';
import { collection, getDocs} from "firebase/firestore"; 
import { db } from '../../utils/firebase';
import { NavLink } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';
const Blog = ({ }) => {

    const [articles, setArticles] = useState([]);
    const ref = getDocs(collection(db, "articles"));
 

    //Get articles in real time
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
    
    useEffect(() => {
        getArticles();
       
    }, []);

 
    // if (!currentUser) {
    //     return <Redirect to="/login" />
    // }

    var categoriesArray = []
    articles.map((article) => {
        categoriesArray.push(article.category)
    })
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
                        <NavLink to={`single-post/${article.id}`} key={article.id} className="blog-card" category={article.category} id={article.id} key={article.id}>
                            <div className="img-wrap">
                                <img src={article.imageURL} alt="article image" />
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