import React, { useState } from 'react';

const Navbar = ({ handleSearchButtonClick, logout, navState, setNavState, info }) => {

    const [searchItem, setSearchItem] = useState("");

    return (
        <div className='navbar-container'>
            <nav className="navbar">

                <div className="navbar-logo">
                    <div onClick={() => setNavState('discover')} >
                        <i className="fa-solid fa-earth-asia"></i> NewsAdda
                    </div>
                </div>

                { navState === 'discover' && <div className="navbar-search">
                    <input
                        id='search-input'
                        type="text"
                        placeholder="Search..."
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                    <button onClick={() => handleSearchButtonClick(searchItem)}>
                        <i className="fa-solid fa-magnifying-glass"></i>
                    </button>
                </div>}

                <div className="navbar-tabs">

                    <div>
                        <input 
                            type="radio"
                            name="navState"
                            id='discover'
                            value='discover'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "discover"}
                        />
                        <label htmlFor="discover" className="navbar-tab label">Discover</label>
                    </div>

                    {info && <div>
                        <input 
                            type="radio"
                            name="navState"
                            id='profile'
                            value='profile'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "profile"}
                        />
                        <label htmlFor="profile" className="navbar-tab label">Profile</label>
                    </div>}

                    <div>
                        <input 
                            type="radio"
                            name="navState"
                            id='about'
                            value='about'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "about"}
                        />
                        <label htmlFor="about" className="navbar-tab label">About</label>
                    </div>

                    <div >
                        <label className="navbar-tab" onClick={logout}>{ info ? "Logout" : "Login" }</label>
                    </div>
                    
                </div>


            </nav>
            <hr />
        </div>
    );
}

export default Navbar;

