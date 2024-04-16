import React from "react";

export default function Sidebar({ filters, setFilters, navState, setNavState, menu, setMenu, info }) {

    function handleChange(event) {
        const { name, value } = event.target;
        setFilters(prev => {
            return {
                ...prev,
                [name]: value
            }
        })
    }

    console.log(filters)

    return (
        <div className="sidebar-container">

            {info && <section>
                <div>
                    <i
                        className="fas fa-bars menu-button"
                        onClick={() => {
                            if (menu === 'open') {
                                setMenu('close')
                            } else {
                                setMenu('open')
                            }
                        }}
                    ></i>
                    {menu === 'open' && <span className="menu-button">Menu</span>}
                </div>

                {menu === 'close' && <section>
                    <div>
                        <input
                            type="radio"
                            name="navState2"
                            id='home'
                            value='home'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "home"}
                        />
                        <label htmlFor="home" className="big-label"> <i className="fas fa-house"></i></label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="navState2"
                            id='saved'
                            value='saved'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "saved"}
                        />
                        <label htmlFor="saved" className="big-label">  <i className="fas fa-star"></i></label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="navState2"
                            id='following'
                            value='following'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "following"}
                        />
                        <label htmlFor="following" className="big-label">  <i className="fas fa-bookmark"></i></label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="navState2"
                            id='weather'
                            value='weather'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "weather"}
                        />

                        <label htmlFor="weather" className="big-label"> <i className="fas fa-cloud "></i></label>
                    </div>
                </section>}

                {menu === 'open' && <section>
                    <h3>NavBar</h3>
                    <div>
                        <input
                            type="radio"
                            name="navState2"
                            id='home'
                            value='home'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "home"}
                        />
                        <label htmlFor="home" className="label" > <i className="fas fa-house"></i> &nbsp; Home</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="navState2"
                            id='saved'
                            value='saved'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "saved"}
                        />
                        <label htmlFor="saved" className="label">  <i className="fas fa-star"></i> &nbsp; Saved</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="navState2"
                            id='following'
                            value='following'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "following"}
                        />
                        <label htmlFor="following" className="label" >  <i className="fas fa-bookmark"></i> &nbsp; Following</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="navState2"
                            id='weather'
                            value='weather'
                            onChange={(e) => setNavState(e.target.value)}
                            checked={navState === "weather"}
                        />

                        <label htmlFor="weather" className="label" > <i className="fas fa-cloud "></i> &nbsp; Weather</label>
                    </div>
                </section>}

            </section>
            }


            {navState === 'home' && menu === 'open' && <main className="sidebar-main">

            {filters.type === 'top-headlines' && <section>
                    <h3>Category</h3>
                    <div>
                        <input
                            type="radio"
                            name="category"
                            id="general"
                            value="general"
                            onChange={handleChange}
                            checked={filters.category === "general"}
                        />
                        <label htmlFor="general" className="label">General</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="category"
                            id="science"
                            value="science"
                            onChange={handleChange}
                            checked={filters.category === "science"}
                        />
                        <label htmlFor="science" className="label">Science</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="category"
                            id="sports"
                            value="sports"
                            onChange={handleChange}
                            checked={filters.category === "sports"}
                        />
                        <label htmlFor="sports" className="label">Sports</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="category"
                            id="technology"
                            value="technology"
                            onChange={handleChange}
                            checked={filters.category === "technology"}
                        />
                        <label htmlFor="technology" className="label">Technology</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="category"
                            id="health"
                            value="health"
                            onChange={handleChange}
                            checked={filters.category === "health"}
                        />
                        <label htmlFor="health" className="label">Health</label>

                    </div>
                    <input
                        type="radio"
                        name="category"
                        id="business"
                        value="business"
                        onChange={handleChange}
                        checked={filters.category === "business"}
                    />
                    <label htmlFor="business" className="label">Business</label>

                    <div>
                        <input
                            type="radio"
                            name="category"
                            id="entertainment"
                            value="entertainment"
                            onChange={handleChange}
                            checked={filters.category === "entertainment"}
                        />
                        <label htmlFor="entertainment" className="label">Entertainment</label>
                    </div>
                </section>}

                {filters.type === 'everything' && <section>
                    <h3>Sort By</h3><div>
                        <div>
                            <input
                                type="radio"
                                name="sortby"
                                id="relevancy"
                                value="relevancy"
                                onChange={handleChange}
                                checked={filters.sortby === "relevancy"}
                            />
                            <label htmlFor="relevancy" className="label">Relevancy</label>
                        </div>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="sortby"
                            id="popularity"
                            value="popularity"
                            onChange={handleChange}
                            checked={filters.sortby === "popularity"}
                        />
                        <label htmlFor="popularity" className="label">Popularity</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="sortby"
                            id="publishedAt"
                            value="publishedAt"
                            onChange={handleChange}
                            checked={filters.sortby === "publishedAt"}
                        />
                        <label htmlFor="publishedAt" className="label">Published At</label>
                    </div>
                </section>}

                <section>
                    <h3>Type</h3>
                    <div>
                        <input
                            type="radio"
                            name="type"
                            id="top-headlines"
                            value="top-headlines"
                            onChange={handleChange}
                            checked={filters.type === "top-headlines"}
                        />
                        <label htmlFor="top-headlines" className="label">Top-headlines</label>
                    </div>
                    <div>
                        <input
                            type="radio"
                            name="type"
                            id="everything"
                            value="everything"
                            onChange={handleChange}
                            checked={filters.type === "everything"}
                        />
                        <label htmlFor="everything" className="label">Everything</label>
                    </div>
                </section>

                {filters.type === 'top-headlines' && <section>
                    <h3>Region</h3>
                    <div>
                        <input
                            type="radio"
                            name="region"
                            id="world"
                            value="world"
                            onChange={handleChange}
                            checked={filters.region === "world"}
                        />
                        <label htmlFor="world" className="label">World</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="region"
                            id="india"
                            value="in"
                            onChange={handleChange}
                            checked={filters.region === "in"}
                        />
                        <label htmlFor="india" className="label">India</label>
                    </div>

                    <div>
                        <input
                            type="radio"
                            name="region"
                            id="us"
                            value="us"
                            onChange={handleChange}
                            checked={filters.region === "us"}
                        />
                        <label htmlFor="us" className="label">United States</label>
                    </div>
                </section>}

            </main>}
            {navState === "weather" && menu === 'open' && <p className="note">Note : Enter The name of the place in Search Bar.</p> }
        </div>
    )
}