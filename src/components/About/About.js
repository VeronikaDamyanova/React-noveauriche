import './About.css';

const About = () => {
    return (
        <section className="about-us">
            <div className="wrapper">
                <div className="top-content">
                    <div className="content">
                        <h2>About Nouveauriche Fashion</h2>
                        <p>
                            We at Nouveauriche Fashion are dedicated to sharing the latest trends in fashion and design with the community. Here you can find all the trending brands for clothes, bags, shoes and more (even some gossip). 
                        </p>
                    </div>
                    <img src="./images/about-us-img.avif" alt="about us" />

                </div>

                <p className='quote'>"What you wear is how you present yourself to the world, especially today, when human contacts are so quick. Fashion is instant language." —Miuccia Prada</p>
               
            </div>
        </section>
    )
}

export default About;