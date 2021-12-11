import React, { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, onSnapshot } from "firebase/firestore"; 
import { db } from '../../utils/firebase';
import { NavLink } from 'react-router-dom';

const LatestPosts = ({ })  =>  {

    const [articles, setArticles] = useState([]);
    
    useEffect(() => {
        const ref = collection(db, "articles");
        const q = query(ref, orderBy("lastUpdate", "desc"), limit(3));
        const unsub = onSnapshot(q, (snapshot) =>
            setArticles(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
        )

        return unsub;
    }, []);

    return (
        <section className="latest-posts">
            <div className="wrapper">
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

export default LatestPosts;