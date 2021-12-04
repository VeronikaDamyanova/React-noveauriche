import React from 'react'
import LatestPosts from './LatestPosts';
import About from './About';

const Home = () => {
    return (
        <>

        <div className="main-image-wrapper">
            <div className="main-image" style={{ backgroundImage: `url("./images/home-img.avif")` }}></div>
        </div>
        <LatestPosts />
        <About />
        <LatestPosts />

        </>
    )
}

export default Home;