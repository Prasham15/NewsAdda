import React, { useState } from "react";

import Navbar from "./Navbar.js"
import Discover from "./Discover.js"
import Profile from './Profile.js'
import About from './About.js'

export default function Main({info, logout, Login}){
    const [searchItem2, setSearchItem2] = useState("");
    const [navState, setNavState] = useState("discover");

    
    function handleSearchButtonClick(searchItem){
        setSearchItem2(searchItem)
    }

    let content;
    if(navState === 'discover'){
        content = <Discover searchItem={searchItem2} info={info} setSearchItem={handleSearchButtonClick}/>
    } else if(navState === 'profile' ){
        content = <Profile info={info} Login={Login} setNavState={setNavState}/>
    } else if(navState === 'about'){
        content = <About/>
    }

    return(
        <div className="home-container">
            <header className="home-header">
                <Navbar
                    handleSearchButtonClick={handleSearchButtonClick}
                    logout={logout}
                    navState={navState}
                    setNavState={setNavState}
                    info={info}
                />
            </header>
            <main className="home-main">
                {content}
            </main>
        </div>
    );
}