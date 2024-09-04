import React, { useState } from 'react';
import "./Articles.css";
import { useSelector } from 'react-redux';

const Data = ({ title, image, link }) => {
  return (
    <div className='news'>
      <a href={link} target="_blank" rel="noopener noreferrer">
        <img src={image} alt={title}></img>
        <div className="news"style={{ fontSize: 20, fontWeight: 500, textAlign: "left" }}>{title}</div>
      </a>
    </div>
  );
};

const BlockData = ({ articles }) => {
    return (
      <div className="ArticleBlock">
        <div style={{ fontSize: 25, fontWeight: 500, textAlign: "left", paddingTop: 30 }}>Read these Articles</div>
        <div className='grid-container'>
          {articles.map((article, index) => (
            <div className='grid-item datablock' key={index}>
              <a href={article.link} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
const Articles = React.forwardRef((props, ref) => {
    const articles = useSelector(state=>state.article)
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 4;
  const totalPages = Math.ceil(articles.length / articlesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  // Determine the articles to display on the current page
  const startIndex = (currentPage - 1) * articlesPerPage;
  const currentArticles = articles.slice(startIndex, startIndex + articlesPerPage);

  // Get the top 12 articles for BlockData
  const blockDataArticles = articles.slice(0, 12);

  return (
    <>
      <div className='articles' ref={ref}>
      <div className="justify-between"style={{ fontSize: 30, fontWeight: 500, textAlign: "left",display:"flex", flexDirection:"row"}}>
        <div>Intresting Articles</div>
        <div className='flex flex-row pr-40'>
        <div onClick={handlePrevPage} style={{ cursor: currentPage > 1 ? 'pointer' : 'not-allowed' }}>
            <i className="material-icons" style={{ paddingTop: 7 }}>chevron_left</i>
          </div>
          <div className='pr-10 pl-10'><small>{`${currentPage}/${totalPages}`}</small></div>

          <div onClick={handleNextPage} style={{ cursor: currentPage < totalPages ? 'pointer' : 'not-allowed' }}>
            <i className="material-icons" style={{ paddingTop: 7 }}>chevron_right</i>
          </div>
        </div>
      </div>        <div className='flex flex-row'>
          {currentArticles.map((article, index) => (
            <Data key={index} title={article.title} image={article.image} link={article.link} />
          ))}
        </div>
   
      </div>
      <BlockData articles={blockDataArticles} />
    </>
  );
});

export default Articles;
