import { Link } from 'react-router-dom';
import './ArticlesList.css';

const ArticlesList = ({ articles, activeArticleId, showHeading = false }) => {
  return (
    <nav className="articles-list" aria-label="Articles">
      {showHeading && <h2 className="articles-list__heading">Articles</h2>}
      <ul className="articles-list__items">
        {articles.map((article) => (
          <li key={article.name}>
            <Link
              to={`/article/${article.name}`}
              className={
                article.name === activeArticleId
                  ? 'articles-list__link articles-list__link--active'
                  : 'articles-list__link'
              }
            >
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default ArticlesList;
