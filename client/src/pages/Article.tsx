import React, { useEffect, useState, Suspense, lazy } from 'react';
import { useParams } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { FaCalendarAlt, FaFileWord, FaClock } from "react-icons/fa";
import '@/styles/markdown.scss';
import TableOfContents from '@/components/Function/TableOfContent';

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
        
        const data: ArticlePost = await response.json();
        setPost(data);
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
  if (error) return <div className="error">{error}</div>;
  if (!post) return <div>Post not found.</div>;

  const renderHeader = (level: number, children: React.ReactNode) => {
    if (!children) return null;
    const Tag = `h${level}` as keyof JSX.IntrinsicElements;
    const id = typeof children === 'string' ? children.toLowerCase().replace(/\s+/g, '-') : '';
    return <Tag id={id} className="heading">{children}</Tag>;
  };

  return (
    <div className='h-full w-full flex justify-center relative'>
      <div className='relative w-160 min-w-60 mx-6 flex flex-col gap-y-4 pt-4'>
        <h1 className='text-8 font-700'>{post.title}</h1>
        <div className='pt-4 flex gap-x-4 text-4 font-500'>
          <span className='flex items-center gap-x-1'>
            <FaCalendarAlt />
            发布时间: {post.date}
          </span>
        </div>
        <div className='pt-2 flex gap-x-5 text-4 font-500'>  
          <span className='flex items-center gap-x-1'>
            <FaFileWord />
            文章字数: {post.word_count}
          </span>
          <span className='flex items-center gap-x-1'>
            <FaClock />
            预估阅读时间: {post.estimated_read_time}分钟
          </span>
        </div>
        <div className='pt-6 pb-12 flex w-full'>
          <div className='markdown-content'>
            <Suspense fallback={<div>Loading Code Block...</div>}>
              <ReactMarkdown 
                className='markdown-body' 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => renderHeader(1, children),
                  h2: ({ children }) => renderHeader(2, children),
                  h3: ({ children }) => renderHeader(3, children),
                  h4: ({ children }) => renderHeader(4, children),
                  h5: ({ children }) => renderHeader(5, children),
                  h6: ({ children }) => renderHeader(6, children),
                  // @ts-ignore
                  code: ({ node, inline, className, children, ...props }) => {
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
        {/* TOC */}
        <div className='absolute h-full w-60 right--70'>
          <TableOfContents content={post.content} />
        </div>
      </div>
    </div>
  );
};

export default Article;
