import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// 定义 BlogPost 类型
interface BlogPost {
    title: string;
    date: string;
    content: string;
}

const Blog: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const [post, setPost] = useState<BlogPost | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // 添加错误状态

    useEffect(() => {
        const fetchPost = async () => {
            setLoading(true);
            setError(null); // 重置错误状态
            try {
                const response = await fetch(`/api/blog/${slug}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                // 将 API 返回的数据转换为 BlogPost 类型
                const blogPost: BlogPost = {
                    title: data.Title,
                    date: data.Date,
                    content: data.Content,
                };
                setPost(blogPost);
            } catch (error) {
                console.error('Error fetching blog post:', error);
                setError('Failed to load the blog post. Please try again later.'); // 设置错误信息
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
        </div>
    );
};

export default Blog;
