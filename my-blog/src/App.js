import './App.css';
import HomePage from './pages/HomePage';
import AboutPage from './pages/AboutPage';
import ArticlePage from './pages/ArticlePage';
import ArticleListPage from './pages/ArticleListPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
    <div className="App">
      <header className="app-hero">
        <h1 className="app-hero__title">KWS Phoenix Blog</h1>
        <div className="app-hero__rule" aria-hidden="true" />
      </header>
      <div id="page-body" className="page-body">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/article/:articleId" element={<ArticlePage />} />
          <Route path="/articles-list" element={<ArticleListPage />} />
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
