import React from 'react'
import LatestPosts from '../LatestPosts/LatestPosts';
import About from '../About/About';
import { NavLink } from 'react-router-dom';

const Home = () => {
    return (
        <>

        <div className="main-image-wrapper">
            <div className="main-image" style={{ backgroundImage: `url("./images/home-img.avif")` }}></div>
            <NavLink to="/blog">Blog</NavLink>
        </div>

        {/* Add ="true" to jsx to remove html error */}
        <style jsx="true">{`
            .main-image-wrapper {
                width: 100%;
                margin: 0 auto;
                position: relative;
            }

            .main-image-wrapper a {
                width: fit-content;
                position: absolute;
                bottom: 20%;
                left: 0;
                right: 0;
                margin: 0 auto;
                padding: 15px 30px;
                border-radius: 10px;
                background-color: #FFF;
                color: #000;
                text-decoration: none;
                font-weight: 600;
                letter-spacing: 0.5px;
            }

            .main-image-wrapper .main-image {
                width: 100%;
                height: 80vh;
                margin: 0 auto;
                background-size: cover;
                background-repeat: no-repeat;
                background-attachment: fixed;
                padding: 20px;
            }

            .main-image-wrapper .main-image img {
                width: 100%
            }
        `}</style>
        
        <LatestPosts />
        <About />
        <LatestPosts />

        </>
    )
}

export default Home;