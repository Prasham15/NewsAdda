import React, { useState, useEffect } from "react";

import Newscards from "./Newscards";

export default function Home({ searchItem, filters, menu, info, navState, setSearchItem }) {

    const [page, setPage] = useState(1);
    const [totalResults, setTotalResults] = useState(0);

    function topFunction() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    }

    function handleTotalResults(data){
        setTotalResults(data);
    }

    useEffect(() => {
        setSearchItem('');
    },[navState])
        
    useEffect(() => {
        setPage(1);
    }, [searchItem,filters])

    return (
        <div className='discover-container'>
            <div className="discover-news">
                <Newscards 
                    searchItem={searchItem} 
                    filters={filters} 
                    page={page}
                    totalResults={totalResults} 
                    handleTotalResults={handleTotalResults}
                    menu={menu}
                    info={info}
                    navState={navState}
                />

                <div className="discover-pages">
                    <div>
                        <button onClick={() => { page - 1 > 0 && setPage(prev => prev - 1); topFunction() }} className="page-buttons">&#8592; Previous</button>
                    </div>
                    <div className="page-number">
                        <input
                            id="page"
                            type="text"
                            value={page}
                            onChange={(e) => setPage(Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <button onClick={() => {totalResults > page * 20 && setPage(prev => prev + 1); topFunction()}} className="page-buttons">Next &#8594;</button>
                    </div>
                </div>

            </div>
        </div>
    )
}