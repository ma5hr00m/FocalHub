import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

// 定义 Blog 类型
interface Blog {
    path: string;
    title: string;
    date: string;
}

const BlogList: React.FC = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null); // 添加错误状态

    useEffect(() => {
        const fetchBlogs = async () => {
            setLoading(true);
            setError(null); // 重置错误状态
            try {
                const response = await fetch('/api/v1/blogs');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setBlogs(data); // 设置获取到的博客列表
            } catch (error) {
                console.error('Error fetching blog list:', error);
                setError('Failed to load the blog list. Please try again later.'); // 设置错误信息
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>; // 显示错误信息
    }

    if (blogs.length === 0) {
        return <div>No blogs found.</div>;
    }

    return (
        <div>
            <h1>Blog List</h1>
            <ul>
                {blogs.map((blog) => (
                    <li key={blog.path}>
                        <div>
                            <Link to={blog.path}>
                                <h2>{blog.title}</h2>
                            </Link>
                            <p>{blog.date}</p>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default BlogList;
