import React from 'react'
import LatestPosts from '../LatestPosts/LatestPosts';
import About from '../About/About';

const Home = () => {
    return (
        <>

        <div className="main-image-wrapper">
            <div className="main-image" style={{ backgroundImage: `url("./images/home-img.avif")` }}></div>
        </div>

        {/* Add ="true" to jsx to remove html error */}
        <style jsx="true">{`
            .main-image-wrapper {
                width: 100%;
                margin: 0 auto;
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