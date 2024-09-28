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
        const response = await fetch('/api/v1/articles/all');
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

  if (error) return <div>{error}</div>;
  if (Object.keys(articlesByYear).length === 0) return <div>No articles found.</div>;

  const sortedYears = Object.keys(articlesByYear).sort((a, b) => parseInt(b) - parseInt(a));

  // 函数用于格式化日期
  const formatDate = (date: string) => {
    const datePattern = /^\d{4}-(\d{2}-\d{2})$/; // 匹配 xxxx-xx-xx 格式
    const match = date.match(datePattern);
    return match ? match[1] : date; // 如果匹配，返回 xx-xx，否则返回原始日期
  };

  return (
    <div className='relative w-full h-fit flex flex-col'>
      <div className="w-full h-fit flex flex-col items-center mb12">
        {/* Banner */}
        <div id="banner-wrapper" className="relative w-100vw h-50vh overflow-hidden flex justify-center items-center">
          <img src="./thumb-1920-699287.jpg" className="z-0 absolute w-full h-full object-cover" />
          <hgroup className="z-1 flex flex-col items-center duration-400 ease-ou">
            <h1 className="text-8 tracking-widest font-600 text-gray-1 md:text-10 lg:text-12">文章</h1>
            <p className="text-gray-1 text-3 md:text-4 lg:text-5">记录学习的点点滴滴</p>
          </hgroup>
        </div>
        {/* Loading 和 文章列表平级 */}
        {loading ? (
          <div>Loading...</div>
        ) : (
          <div className='max-w-180 wfull min-w-50 px4 flex flex-col gap-y-4 pt6'>
            {sortedYears.map((year) => (
              <div key={year} className='pt2 first:pt0'>
                <span className='text-5 md:text-6 font-700 text-gray-8'>{year}</span>
                <div className='pt2 flex flex-col gap-y1'>
                  {articlesByYear[year].map(({ path, title, date }) => (
                    <Link to={path} key={path} className='flex justify-between gap-x-4 duration-300 font-500 text-3.5 md:text-4 text-gray-6 visited:text-gray-6 hover:text-blue-5'>
                      <span className='whitespace-nowrap overflow-hidden'>{title}</span>
                      <span className='w-22 flex justify-end whitespace-nowrap overflow-hidden'>{formatDate(date)}</span>
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ArticleList;
