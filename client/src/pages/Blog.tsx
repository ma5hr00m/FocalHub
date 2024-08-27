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

    useEffect(() => {
        fetch(`http://127.0.0.1:2060/api/blog/${slug}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                // console.log(data);
                // 将 API 返回的数据转换为 BlogPost 类型
                const blogPost: BlogPost = {
                    title: data.Title,
                    date: data.Date,
                    content: data.Content,
                };
                setPost(blogPost);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching blog post:', error);
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (!post) {
        return <div>Post not found.</div>;
    }

    return (
        <div>
            <p>Blog</p>
            <span>{post.title}</span>
            <p>{post.date}</p>
            <ReactMarkdown>{post.content}</ReactMarkdown>
        </div>
    );
};

export default Blog;
