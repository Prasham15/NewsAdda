import React,{useState, useEffect} from "react";
import axios from 'axios';

import Ncard from './Ncard';

export default function Follow({info, menu, navState, setSearchItem }){
    const [sources, setSources] = useState([]);
    // const []
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        setSearchItem('');
    },[navState])

    useEffect(() => {
        axios.post('http://localhost:4000/following',{
            email: info.email
        }).then((res) => {
            setSources(res.data.following)
        })
    },[navState, menu, info])

    useEffect(() => {
        const fetchData = async () => {
            try {
                let url;
                const apiKey = "645d2a4ba9484572ba4081a9f4c54efd";
                url = `https://newsapi.org/v2/top-headlines?apiKey=${apiKey}&country=in&category=general&pageSize=100`

                console.log(url)
                const response = await fetch(url);
                const data = await response.json();
                if (data["status"] === "error") {
                    alert("Api Response Error");
                } else {
                    setArticles(data.articles);
                }
                console.log(data)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        fetchData();

    },[navState, menu, info])


    return(
        <div>
            <h1>Following Sources</h1>
            <div>
                {sources.map((source,index) => {
                    return <div className="follow" key={index} >{source}</div>
                })}
            </div>
            <div className="newscards">
                {articles.map( (article, index) => {
                    if (article.title !== "[Removed]"){
                        for (let i=0; i < sources.length; i++){
                            if (article.source.name === sources[i] || article.author === sources[i]){
                                return <Ncard key={index} index={index} article={article} menu={menu} />
                            }
                        }
                    } return null       
                })}
            </div>
        </div>
    )
}