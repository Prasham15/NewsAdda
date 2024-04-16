import React, { useState } from "react";

import Sidebar from "./Sidebar";
import Home from "./Home";
import Saved from "./Saved";
import Following from "./Following";
import Weather from "./Weather";

export default function Discover({ searchItem, info, setSearchItem}) {
    const [navState, setNavState] = useState('home');
    const [menu, setMenu] = useState('open');
    const [filters, setFilters] = useState({
        type: "top-headlines",
        region: "in",
        category: "general",
        sortby: "publishedAt"
    })

    let content;
    if (navState === "home"){
        content = <Home searchItem={searchItem} filters={filters} menu={menu} info={info} navState={navState} setSearchItem={setSearchItem}/>
    } else if (navState === "saved"){
        content = <Saved menu={menu} info={info} searchItem={searchItem} navState={navState} setSearchItem={setSearchItem}/>
    } else if (navState === "following"){
        content = <Following menu={menu} info={info} navState={navState} setSearchItem={setSearchItem}/>
    } else if (navState === 'weather'){
        content = <Weather menu={menu} searchItem={searchItem} info={info} navState={navState} setSearchItem={setSearchItem}/>
    }

    return (
        <div className="discover-container">
            <div className={`discover-side-${menu}`}>
                <Sidebar 
                    filters={filters} 
                    setFilters={setFilters}
                    navState={navState}
                    setNavState={setNavState}
                    menu={menu}
                    setMenu={setMenu}
                    info={info}
                />
            </div>
            <main className={`discover-main-${menu}`}> 
                {content}
            </main>
        </div>
    )
}