import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 定义 Article 类型
interface Article {
  path: string;
  title: string;
  date: string;
}

interface ArticlesByYear {
  [year: string]: Article[];
}

const ArticleList: React.FC = () => {
  const [articlesByYear, setArticlesByYear] = useState<ArticlesByYear>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/v1/articles');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setArticlesByYear(data);
      } catch (error) {
        console.error('Error fetching article list:', error);
        setError('Failed to load the article list. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchArticles();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (Object.keys(articlesByYear).length === 0) return <div>No articles found.</div>;

  return (
    <div>
      <h1>Article List</h1>
      {Object.entries(articlesByYear).map(([year, articles]) => (
        <div key={year}>
          <h2>{year}</h2>
          <ul>
            {articles.map(({ path, title, date }) => (
              <li key={path}>
                <div>
                  <Link to={path}>
                    <h3>{title}</h3>
                  </Link>
                  <p>{date}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ArticleList;
