import BlogCard from "../components/BlogCard";

const LatestPosts = ({ }) => {


    return (
        <section className="latest-posts">
            <div className="wrapper">
                <a href="" className="blog-card">
                    <div className="img-wrap">
                        <img src="../card-img.avif" alt="about us image" />
                    </div>

                    <div className="content">
                        <span className="category">Runway</span>
                        <h4>What fashion looked like in 1980s</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consectetur nisi illo beatae vel rerum nesciunt est aut eius, obcaecati nam itaque possimus atque. Sapiente vitae sunt nesciunt dolore omnis?</p>
                        
                        <hr />

                        <div className="authorWrap">
                            By <span className="author">Veronika Damyanova</span>
                        </div>
                    </div>
                </a>


                <a href="" className="blog-card">
                    <div className="img-wrap">
                        <img src="../card-img.avif" alt="about us image" />
                    </div>

                    <div className="content">
                        <span className="category">Versace</span>
                        <h4>What fashion looked like in 1980s</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consectetur nisi illo beatae vel rerum nesciunt est aut eius, obcaecati nam itaque possimus atque. Sapiente vitae sunt nesciunt dolore omnis?</p>
                        
                        <hr />

                        <div className="authorWrap">
                            By <span className="author">Veronika Damyanova</span>
                        </div>
                    </div>
                </a>

                <a href="" className="blog-card">
                    <div className="img-wrap">
                        <img src="../card-img.avif" alt="about us image" />
                    </div>

                    <div className="content">
                        <span className="category">Bags</span>
                        <h4>What fashion looked like in 1980s</h4>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus consectetur nisi illo beatae vel rerum nesciunt est aut eius, obcaecati nam itaque possimus atque. Sapiente vitae sunt nesciunt dolore omnis?</p>
                        
                        <hr />

                        <div className="authorWrap">
                            By <span className="author">Veronika Damyanova</span>
                        </div>
                    </div>
                </a>
            </div>
        </section>




    )
}

export default LatestPosts;