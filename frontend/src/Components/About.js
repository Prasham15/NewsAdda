import React from "react";

export default function About({logout}){
    return(
        <div className="about-container">
            <main className="about-main">
                <h1>NewsAdda</h1>
                <ul>
                    <span>This is a News Website where you can read about the latest news.</span>
                    <br/>
                    <span>You can also search for specific news, save them, and discuss with people about them.</span>
                    <br/>
                </ul>

                <h2>Creators</h2>
                <ul>
                    <span>We are students who created this website as a part of our college(Nirma University) project on Full-Stack Web Development.</span>
                    <br/>
                    <br/>
                    <h3>Het Shah,</h3> <span>Email: 22BCE322@nirmauni.ac.in</span>
                    <br/>
                    <h3>Prasham Shah,</h3> <span> Email: 22BCE325@nirmauni.ac.in</span>
                </ul>

                <h2>FeedBack</h2>
                <ul>
                    <span>You can mail us your feedback, what you think about the website, any bugs, any suggession, etc.</span>
                </ul>

            </main>
        </div>
        
    )
}