import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

// 定义 ArticlePost 类型
interface ArticlePost {
  title: string;
  date: string;
  content: string;
  word_count: number;
  estimated_read_time: number;
}

const Article: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<ArticlePost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(`/api/v1/article/${slug}`);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        const articlePost: ArticlePost = {
          title: data.title,
          date: data.date,
          content: data.content,
          word_count: data.word_count,
          estimated_read_time: data.estimated_read_time
        };
        setPost(articlePost);
      } catch (error) {
        console.error('Error fetching article post:', error);
        setError('Failed to load the article post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!post) return <div>Post not found.</div>;

  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.date}</p>
      <ReactMarkdown>{post.content}</ReactMarkdown>
      <p>Word Count: {post.word_count}</p>
      <p>Estimated Read Time: {post.estimated_read_time} minute(s)</p>
    </div>
  );
};

export default Article;
