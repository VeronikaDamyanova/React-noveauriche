import React, { useState, useEffect } from 'react';
import { collection, query, onSnapshot, where } from "firebase/firestore"; 
import { db } from '../../utils/firebase';
import { NavLink } from 'react-router-dom';

const MyPosts = ()  =>  {
    const [articles, getArticles] = useState([]);
    const articlesCollection = collection(db, "articles");
    useEffect(() => {
        //get the uid from localStorage that we populate in AuthContext - so we can refresh the page and not get null for owner
        const owner = localStorage.getItem('currentUserUID')        ;
        const myArticlesFilter = query(articlesCollection, where("owner", "==", owner));

        //Get comments and updates in realtime
        const myArticles = onSnapshot(myArticlesFilter, (snapshot) =>
            getArticles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )
    }, []);

    return (
        <>
        <section className="latest-posts my-posts">
            <div className="wrapper">  
                {articles.map((article) => (
                    <NavLink to={`single-post/${article.id}`} className="blog-card blog-card-mypost" category={article.category} id={article.id} key={article.id}>
                        <div className="img-wrap">
                            <img src={article.imageURL} alt="about us" />
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

        {/* Add ="true" to jsx to remove html error */}
        <style jsx="true">{`
            .latest-posts {
                width: 100%;
                padding: 40px 0px;
            }

            .latest-posts .wrapper {
                width: 100%;
                max-width: 1480px;
                display: flex;
                flex-wrap: wrap;
                justify-content: space-between;
                padding: 20px;
                margin: 0 auto;
            }

            .latest-posts.my-posts .wrapper {
                justify-content: flex-start;
            }

            .latest-posts.my-posts .blog-card-mypost {
                max-width: 380px;
                width: 100%;
                flex: auto;
            }

        `}</style>
        </>
    )
}

export default MyPosts;