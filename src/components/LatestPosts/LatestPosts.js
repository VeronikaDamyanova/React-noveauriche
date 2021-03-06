import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore"; 
import { db } from '../../utils/firebase';
import { NavLink } from 'react-router-dom';

const LatestPosts = ()  =>  {

    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        const getCollection = collection(db, "articles");
        const collectionQuery = query(getCollection, orderBy("lastUpdate", "desc"), limit(3));
        const getArticles = onSnapshot(collectionQuery, (snapshot) =>
            setArticles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )

        //return in order to stop firebase from observing in realtime and save memory
        return getArticles;
    }, []);

    return (
        <>
        <section className="latest-posts">
            <div className="wrapper">
                {articles.map((article) => (
                    <NavLink to={`single-post/${article.id}`} className="blog-card" category={article.category} id={article.id} key={article.id}>
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

        `}</style>
        </>
    )
}

export default LatestPosts;