import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import * as articleService from '../services/articleService';
import * as authService from '../services/authService';

const BlogContext = createContext(null);

export function BlogProvider({ children }) {
  const [articles, setArticles] = useState([]);
  const [user, setUser] = useState(authService.getCurrentUser());

  const refreshArticles = useCallback(() => {
    setArticles(articleService.getArticles());
  }, []);

  useEffect(() => {
    refreshArticles();
  }, [refreshArticles]);

  const login = useCallback((username, password) => {
    const ok = authService.login(username, password);
    if (ok) setUser(authService.getCurrentUser());
    return ok;
  }, []);

  const logout = useCallback(() => {
    authService.logout();
    setUser(null);
  }, []);

  const addArticle = useCallback(
    (data) => {
      const article = articleService.addArticle({
        ...data,
        author: user || 'Guest',
      });
      refreshArticles();
      return article;
    },
    [user, refreshArticles]
  );

  const value = {
    articles,
    refreshArticles,
    addArticle,
    user,
    isLoggedIn: Boolean(user),
    login,
    logout,
  };

  return (
    <BlogContext.Provider value={value}>{children}</BlogContext.Provider>
  );
}

export function useBlog() {
  const ctx = useContext(BlogContext);
  if (!ctx) {
    throw new Error('useBlog must be used within BlogProvider');
  }
  return ctx;
}
