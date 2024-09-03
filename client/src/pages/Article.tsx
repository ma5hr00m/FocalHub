import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

import { FaCalendarAlt } from "react-icons/fa";
import { FaFileWord, FaClock } from "react-icons/fa6";

import '@/styles/markdown.scss';

const CodeBlock = lazy(() => import('@/components/Function/CodeBlock'));

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
    <div className='h-full w-full flex justify-center'>
      <div className='w-200 min-w-60 px6 flex flex-col gap-y-4 pt6'>
        <div className='w-full flex-col text-wrap'>
          <p className='text-8 font-700'>{post.title}</p>
          <div className='pt4 flex gap-x-4 text-4 font-500'>
            <span className='flex items-center gap-x1'>
              <FaCalendarAlt />
              发布时间: {post.date}
            </span>
          </div>
          <div className='pt2 flex gap-x5 text-4 font-500'>  
            <span className='flex items-center gap-x1'>
              <FaFileWord />
              文章字数: {post.word_count}
            </span>
            <span className='flex items-center gap-x1'>
              <FaClock />
              预估阅读时间: {post.estimated_read_time}分钟
            </span>
          </div>
        </div>
        <div className='pt6 pb12'>
          <Suspense fallback={<div>Loading Code Block...</div>}>
            <ReactMarkdown 
              className='markdown-body' 
              remarkPlugins={[remarkGfm]}
              components={{
                // @ts-ignore
                code: ({ node, inline, className, children, ...props }: { node?: any; inline: boolean; className?: string; children: React.ReactNode; }) => {
                  const match = /language-(\w+)/.exec(className || '');
                  return !inline && match ? (
                    <CodeBlock language={match[1]} {...props}>
                      {String(children).replace(/\n$/, '')}
                    </CodeBlock>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                }
              }}
            >
              {post.content}
            </ReactMarkdown>
          </Suspense>
        </div>
      </div>
    </div>
  );
};

export default Article;
