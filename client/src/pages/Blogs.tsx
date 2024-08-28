import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 定义 Article 类型
interface Article {
    path: string;
    title: string;
    date: string;
}

const ArticleList: React.FC = () => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // 添加错误状态

    useEffect(() => {
        const fetchArticles = async () => {
            setLoading(true);
            setError(null); // 重置错误状态
            try {
                const response = await fetch('/api/v1/articles');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setArticles(data); // 设置获取到的博客列表
            } catch (error) {
                console.error('Error fetching article list:', error);
                setError('Failed to load the article list. Please try again later.'); // 设置错误信息
            } finally {
                setLoading(false);
            }
        };

        fetchArticles();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>; // 显示错误信息
    }

    if (articles.length === 0) {
        return <div>No articles found.</div>;
    }

    return (
        <div>
            <h1>Article List</h1>
            <ul>
                {articles.map((article) => (
                    <li key={article.path}>
                        <div>
                            <Link to={article.path}>
                                <h2>{article.title}</h2>
                            </Link>
                            <p>{article.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ArticleList;
