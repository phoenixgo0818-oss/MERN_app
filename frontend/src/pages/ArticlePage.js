import { useParams } from 'react-router-dom';
import articles from './article-content';
import ArticlesList from '../components/ArticlesList';
import './ArticlePage.css';

const ArticlePage = () => {
  const { articleId } = useParams();
  const article = articles.find((a) => a.name === articleId);

  if (!article) {
    return <h1>Article not found</h1>;
  }

  return (
    <div className="article-layout">
      <aside className="article-layout__sidebar">
        <ArticlesList articles={articles} activeArticleId={articleId} />
      </aside>
      <main className="article-layout__main">
        <h1>{article.title}</h1>
        {article.content.map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </main>
    </div>
  );
};

export default ArticlePage;
