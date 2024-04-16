import React, { useState, useEffect } from "react";
import axios from "axios";
import Ncard from './Ncard';

export default function Saved({ info, menu, navState, setSearchItem }) {
    const [articles, setArticles] = useState([]);
    const [articlesData, setArticlesData] = useState([]);
    const [data, setData] = useState([]);
    const [change, setChange] = useState(true);

    let following = [];
    let saved = [];
    let res;

    useEffect(() => {
        setSearchItem('');
    },[navState])

    useEffect(() => {
        const setData = async () => {
            if (info) {
                console.log('effect is running in if info 1')

                res = await axios.post("http://localhost:4000/saved", {
                    email: info.email
                })
                console.log(articles);
                console.log(res);
                saved = res.data.saved;
                setArticles(prev => {
                    prev = [...saved];
                    return prev
                });
                console.log('final', articles)
            }

        };
        setData().then(() => {
            console.log('set end ', articles);
        })

    }, [info, navState, change])

    useEffect(() => {
        const temp = async () => {
            res = await axios.post("http://localhost:4000/following", {
                email: info.email
            })
            following = res.data.following;
    
            console.log("before end", articles)
            articles.map((article, index) => {
                setArticlesData(prev => {
                    prev[index] = { saved: true, following: false };
                    return [...prev];
                });
                let i = 0;
                for (i=0; i < following.length; i++){
                    if (article.source.name === following[i]){
                        setArticlesData(prev => {
                            prev[index].following = true
                            return [...prev];
                        });
                        break;
                    }
                }
            });
        }
        temp()
        console.log("end of effect", articlesData)
    },[articles])

    function handleClick(index, type) {
        if (type === 'following') {
            if (articlesData[index].following) {
                axios.post("http://localhost:4000/following/remove", {
                    email: info.email,
                    card: articles[index].source.name
                })
            } else {
                axios.post("http://localhost:4000/following/add", {
                    email: info.email,
                    card: articles[index].source.name
                })
            }
        } else {
            if (articlesData[index].saved) {
                axios.post("http://localhost:4000/saved/remove", {
                    email: info.email,
                    card: articles[index]
                })
            } else {
                axios.post("http://localhost:4000/saved/add", {
                    email: info.email,
                    card: articles[index]
                })
            }
        }
        setChange(prev => !prev);
    }

    useEffect(() => {
        console.log('articlesData before render', articlesData)
        setData(
            articles.map((article, index) => (
                article.title !== "[Removed]" && <Ncard articlesData={articlesData[index]} key={index} index={index} article={article} menu={menu} info={info} handleClick={handleClick} />
            ))
        )
    }, [articlesData, articles, menu, info, navState,change])

    return (
        <section>
            <div>Total-Results: {articles.length}</div>
            <div className="newscards">
                {data}
            </div>
        </section>
    )
}