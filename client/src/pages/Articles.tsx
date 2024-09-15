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
    <div className='flex-1 w-full flex justify-center'>
      <div className='w-160 min-w-50 px6 flex flex-col gap-y-4 pt6'>
        {Object.entries(articlesByYear).map(([year, articles]) => (
          <div key={year} className='pt2 first:pt0'>
            <span className='text-6 font-700 text-gray-8'>{year}</span>
            <div className='pt2 flex flex-col gap-y1'>
              {articles.map(({ path, title, date }) => (
                <Link to={path} key={path} className='px2 flex justify-between font-400 text-gray-6 visited:text-gray-6 hover:text-green-5'>
                  <span className='whitespace-nowrap overflow-hidden text-4'>{title}</span>
                  <span className='w-22 flex justify-end whitespace-nowrap overflow-hidden'>{date}</span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ArticleList;
