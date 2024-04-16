import React from "react";


export default function NewsCard({ articlesData, index, article, menu, info, handleClick }) {
    const [date, time] = article.publishedAt.split('T')
    console.log(articlesData)

    return (
        (<div className={`card-${menu}`}>
            <div className='card-head'>
                <a href={article.url} target="_blank" rel="noopener noreferrer">
                    <img
                        title="Visit the Source"
                        src={article.urlToImage ? article.urlToImage : '../images/img2.jpeg'}
                        alt={article.title}
                        className={`card-img-${menu}`}
                    />
                </a>
                {info && <div className='card-icons'>
                        <div className='card-icon'
                            title={articlesData && articlesData.saved ? 'Unsave': 'Save'}
                            onClick={() => handleClick(index, 'saved')}
                        > {articlesData && articlesData.saved ? <i className='fas fa-star'></i> : <i className='far fa-star'></i>} </div>

                        <div className='card-icon'
                            title={articlesData && articlesData.following ? 'Unfollow' : 'Follow'}
                            onClick={() => handleClick(index, 'following')}
                        >{articlesData && articlesData.following ? <i className='fas fa-user'></i> : <i className='far fa-user'></i>}</div>
                </div>}
            </div>

            <div className="card-body">
                <h5 className='card-date'>{date} &#183; {time.split('Z')}</h5>
                <div>
                    <h5 className='card-title'>{article.title}</h5>
                </div>
            </div>
        </div>)
    );
};
