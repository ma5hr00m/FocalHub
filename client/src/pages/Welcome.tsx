import React, { useEffect, useState } from "react";

interface WellcomeProps {}

interface Article {
  path: string;
  title: string;
  date: string;
}

const Wellcome: React.FC<WellcomeProps> = ({}) => {
  const [recentArticles, setRecentArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const links = [
    {
      href: "https://github.com/ma5hr00m",
      text: "GitHub",
    },
    {
      href: "https://juejin.cn/user/811865333304430",
      text: "稀土掘金",
    },
    {
      href: "https://x.com/ma5hr00m",
      text: "Twitter",
    },
    {
      href: "https://qm.qq.com/q/6p31q2S0p2",
      text: "腾讯QQ"
    }
  ];

  useEffect(() => {
    const fetchRecentArticles = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch('/api/v1/articles/recent');
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        setRecentArticles(data);
      } catch (error) {
        console.error('Error fetching recent articles:', error);
        setError('Failed to load recent articles. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRecentArticles();
  }, []);

  return (
    <div className='relative flex-1 w-full flex flex-col items-center justify-center'>
      {/* https://www.freepik.com/search?format=search&query=4k%20wallpaper%20fire%20 */}
      <div className="w-full h-60vh bg-[url('https://agu-img.oss-cn-hangzhou.aliyuncs.com/main/banner2.jpg')] bg-cover bg-center">
        <hgroup className="w-full h-full flex flex-col justify-center items-center justify-center gap-y-2">
          <h1 className="text-16 tracking-normal text-[#fffe]">Kinoko's Blog</h1>
          <p className="text-4.5 tracking-wide text-[#fffe] font-400">用超绝的行动力压倒心中的犹豫不觉</p>
        </hgroup>
      </div>
      <div className="w-full h-200 bg-cover bg-center"></div>
    </div>
  );
}

export default Wellcome;

{/* 欢迎 */}
        {/* <div className="w-full h-[calc(100vh-3.75rem)] flex flex-col items-center justify-center">
          <div className="profile flex flex-col items-center justify-center">
            <img src='https://img.ma5hr00m.top/main/emoticon/6.png' className='w-40' />
            <p className="text-7 font-600 mt4 mb0 text-gray-6">欢迎来到阿菇的站点</p>
            <p className="text-4 font-400 mt1 text-gray-6">希望用精巧的代码构建一个虚拟的国度</p>
            <div className="relative mt6 w-full max-w-120 h-fit flex justify-center items-center gap-x-4 gap-y-3 flex-wrap">
              {links.map((link, index) => (
                <a
                  key={index}
                  className="duration-300 box-border px4 h9 flex justify-center items-center border-solid border-1px border-gray-6 hover:border-green-5 hover:text-green-5 text-3.5 font-400 rounded-sm text-gray-6"
                  href={link.href}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div> */}
        {/* 最近更新 */}
        {/* <div className="w-full h-fit flex flex-col items-center">
          {loading && <p>Loading recent articles...</p>}
          {error && <p>{error}</p>}
          {recentArticles.length === 0 && !loading && <p>No recent articles found.</p>}
          <div className="w-full gap-4 flex flex-col md:flex-row">
            {recentArticles.map(({ path, title, date }) => (
              <div key={path} className="flex-1 p-4 bg-white border-solid border-1 border-gray-2 w-full text-center duration-300 hover:border-green-5 hover:cursor-pointer">
                <a href={path} className="text-green-5">{title}</a>
                <p className="text-gray-500 text-sm">{date}</p>
              </div>
            ))}
          </div>
        </div> */}