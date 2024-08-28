import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// 定义 ArticlePost 类型
interface ArticlePost {
    title: string;
    date: string;
    content: string;
    word_count: number; // 修改为 number 类型
    estimated_read_time: number; // 修改为 number 类型
}

const Article: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<ArticlePost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // 添加错误状态

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null); // 重置错误状态
            try {
                const response = await fetch(`/api/v1/article/${slug}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // 将 API 返回的数据转换为 ArticlePost 类型
                const articlePost: ArticlePost = {
                    title: data.title, // 修改为小写
                    date: data.date, // 修改为小写
                    content: data.content, // 修改为小写
                    word_count: data.word_count, // 修改为小写
                    estimated_read_time: data.estimated_read_time // 修改为小写
                };
                setPost(articlePost);
            } catch (error) {
                console.error('Error fetching article post:', error);
                setError('Failed to load the article post. Please try again later.'); // 设置错误信息
            } finally {
                setLoading(false);
            }
        };

        fetchPost();
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>; // 显示错误信息
    }

    if (!post) {
        return <div>Post not found.</div>;
    }

    return (
        <div>
            <h1>{post.title}</h1>
            <p>{post.date}</p>
            <ReactMarkdown>{post.content}</ReactMarkdown>
            <p>Word Count: {post.word_count}</p> {/* 修改为小写 */}
            <p>Estimated Read Time: {post.estimated_read_time} minute(s)</p> {/* 修改为小写 */}
        </div>
    );
};

export default Article;
