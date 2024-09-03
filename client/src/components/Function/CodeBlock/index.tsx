import React, { useState, useCallback } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { atomDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { FaCopy } from 'react-icons/fa';

// 在 atom-dark 的基础上修改字体大小
// 参考：https://github.com/react-syntax-highlighter/react-syntax-highlighter
// 实际上就是小驼峰命名法，比如 font-size 变成了 fontSize
const customAtomDark = {
  ...atomDark,
  'code[class*="language-"]': {
    ...atomDark['code[class*="language-"]'],
    fontSize: '0.9em',
  },
  'pre[class*="language-"]': {
    ...atomDark['pre[class*="language-"]'],
    fontSize: '.85em',
    borderTopLeftRadius: '0',
    borderTopRightRadius: '0',
    padding: '1.5rem 1rem',
    marginTop: '0',
  },
};

interface CodeBlockProps {
  language: string;
  children: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ language, children }) => {
  const [copySuccess, setCopySuccess] = useState<string>('');

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(children).then(() => {
      setCopySuccess('Copied!');
      setTimeout(() => setCopySuccess(''), 2000);
    });
  }, [children]);

  return (
    <div className="code-block">
      {/* 自定义代码块功能栏 */}
      <div className="flex justify-between items-center py2 px4 bg-gray-7 rounded-t-1 text-white">
        <span className='font-600 text-3 font-sans'>{language}</span>
        <button onClick={handleCopy} className="flex items-center bg-transparent border-0 cursor-pointer">
          <FaCopy className='text-white bg-transparent' />
          {copySuccess && <span className="ml-2 text-white">{copySuccess}</span>}
        </button>
      </div>
			{/* */}
      <SyntaxHighlighter 
        style={customAtomDark}
        language={language} 
        PreTag="div" 
        showLineNumbers={true}
      >
        {String(children)}
      </SyntaxHighlighter>
    </div>
  );
};

export default CodeBlock;
