import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Ncard from './Ncard'
// import Data from '../Data.js'


export default function NewsCards({ searchItem, filters, page, totalResults, handleTotalResults, menu, info, navState }) {
    const [articles, setArticles] = useState([]);
    const [articlesData, setArticlesData] = useState([]);
    const [Data, setData] = useState([]);
    const [change,setChange] = useState(true);

    let saved = [];
    let following = [];
    let res;

    useEffect( () => {

        const fetchData = async () => {
            try {
                let url;
                const apiKey = "645d2a4ba9484572ba4081a9f4c54efd";
                if (filters.type === 'top-headlines') {
                    if (searchItem === ''){
                        url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&page=${page}${filters.region === 'world' ? "" : '&country=' + filters.region}${filters.category ? '&category=' + filters.category : ""}`
                    } else {
                        url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&page=${page}&q=${searchItem}${filters.category ? '&category=' + filters.category : ""}`
                    }
                } else {
                    url = `https://newsapi.org/v2/everything?apiKey=${apiKey}&q=${searchItem ? searchItem : "news"}&page=${page}&pageSize=20&language=en&sortBy=${filters.sortby}`
                }

                console.log(url)
                const response = await fetch(url);
                const data = await response.json();
                if (data["status"] === "error") {
                    alert("Api Response Error");
                } else {
                    setArticles(data.articles);
                    handleTotalResults(data.totalResults);
                }
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

        // setArticles(Data.articles);
    }, [searchItem, filters, page]);

    useEffect(() => {
        const setData = async () => {

            if (info) {
                console.log('effect is running in if info 1')
    
                res = await axios.post("http://localhost:4000/saved", {
                    email: info.email
                })
                saved = res.data.saved;
                res = await axios.post("http://localhost:4000/following", {
                    email: info.email
                })
                following = res.data.following;

                articles.map((article, index) => {
                    setArticlesData(prev => {
                        prev[index] = { saved: false, following: false };
                        return [...prev];
                    })
                    let i = 0;
                    for (i=0; i < saved.length; i++){
                        if (article.title === saved[i].title){
                            setArticlesData(prev => {
                                prev[index].saved = true
                                return [...prev]
                            });
                            break;
                        }
                    }
                    for (i=0; i < following.length; i++){
                        if (article.source.name === following[i]){
                            setArticlesData(prev => {
                                prev[index].following = true
                                return [...prev]
                            });
                            break;
                        }
                    }
                })
            }
        };

        setData();
    },[articles,info,navState,change])

    useEffect(() => {
        setData(
            articles.map(
                (article, index) => (
                    article.title !== "[Removed]" && <Ncard articlesData={articlesData[index]} key={index} index={index} article={article} menu={menu} info={info} handleClick={handleClick}/>
                )
            )
        )
    },[articles, articlesData, menu, info, navState])

    async function handleClick(index, type) {
        if (type === 'following') {
            if (articlesData[index].following) {
                await axios.post("http://localhost:4000/following/remove", {
                    email: info.email,
                    card: articles[index].source.name
                })
            } else {
                await axios.post("http://localhost:4000/following/add", {
                    email: info.email,
                    card: articles[index].source.name
                })
            }
        } else {
            if (articlesData[index].saved) {
                await axios.post("http://localhost:4000/saved/remove", {
                    email: info.email,
                    card: articles[index]
                })
            } else {
                await axios.post("http://localhost:4000/saved/add", {
                    email: info.email,
                    card: articles[index]
                })
            }
        }
        setChange(prev => !prev);
    }
    
    return (
        <div>
            <div className='news-stats'> Page : {page}  &nbsp;&nbsp;&nbsp; Total-Results : {totalResults} </div>
            <div className="newscards" > {Data} </div>
        </div>
    )
}
