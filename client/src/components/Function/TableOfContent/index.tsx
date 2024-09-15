import React from 'react';

interface TocItem {
  title: string;
  children: TocItem[];
}

interface TableOfContentsProps {
  content: string;
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ content }) => {
  const generateToc = (content: string): TocItem[] => {
    const headings = content.match(/(#{1,6})\s+(.*)/g); // 匹配标题
    const toc: { level: number; title: string }[] = [];

    if (headings) {
      headings.forEach(heading => {
        const level = heading.match(/#/g)?.length || 0; // 获取标题级别
        const title = heading.replace(/(#{1,6})\s+/, ''); // 获取标题文本
        toc.push({ level, title });
      });
    }

    // 构建嵌套结构
    const nestedToc: TocItem[] = [];
    const stack: { level: number; children: TocItem[] }[] = [];

    toc.forEach(item => {
      const { level, title } = item;
      const currentItem: TocItem = { title, children: [] };

      while (stack.length && stack[stack.length - 1].level >= level) {
        stack.pop();
      }

      if (stack.length) {
        stack[stack.length - 1].children.push(currentItem);
      } else {
        nestedToc.push(currentItem);
      }

      stack.push({ level, children: currentItem.children });
    });

    return nestedToc;
  };

  const toc = generateToc(content);

  const renderToc = (items: TocItem[]) => {
    return (
      <div className=''>
        <ul className='list-none text-3 ml4 my2'>
          {items.map((item, index) => (
            <li key={index} className=''>
              <a href={`#${item.title}`} className='text-gray-8 visited:text-gray-8 hover:text-green-6'>{item.title}</a>
              {item.children.length > 0 && renderToc(item.children)}
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return(
    <div className="sticky top-10 mt10 w-full">
      {renderToc(toc)}
    </div>
  );
};

export default TableOfContents;
