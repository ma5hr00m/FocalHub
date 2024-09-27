import React, { useEffect, useState, useCallback  } from "react";
import { Link } from "react-router-dom";

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

  const [isScrolled, setIsScrolled] = useState(false);

  const handleScroll = useCallback(() => {
    const scrollY = window.scrollY;
    if (scrollY > 0 && !isScrolled) {
      setIsScrolled(true);
    } else if (scrollY === 0 && isScrolled) {
      setIsScrolled(false);
    }
  }, [isScrolled]);

  useEffect(() => {
    const onScroll = () => {
      requestAnimationFrame(handleScroll);
    };

    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [handleScroll]);

  return (
    <div className='relative w-ful h-fit flex flex-col'>
      <div className="w-full h-fit">
        {/* Banner */}
        <div id="banner-wrapper" className="relative w-100vw h-100vh overflow-hidden flex justify-center items-center">
          <img src="./banner.jpeg" className="z-0 absolute w-full h-full object-cover" />
          <hgroup className={`z-1 flex flex-col items-center duration-800 ease-out ${isScrolled ? 'blur-[20rem]' : ''}`}>
            <h1 className="text-10 tracking font-700 text-gray-1 md:text-12 lg:text-14">Kinoko's Blog</h1>
            <p className="text-5">人生是一场无法停止的旅行</p>
          </hgroup>
        </div>
        {/* Recent Articles */}
        <div id="recent-articles-wrapper" className="relative w-100vw h-fit overflow-hidden pt8 pb8 px8 flex flex-col justify-center items-center">
          <div className="w-full flex flex-col items-center gap-y-4 mb16">
            {loading && <p>Loading recent articles...</p>}
            {error && <p>{error}</p>}
            {recentArticles.length === 0 && !loading && <p>No recent articles found.</p>}
            {recentArticles.map(({ path, title, date }) => (
              <a key={path} href={path} className="relative h48 max-w-220 wfull mx8 flex justify-between group bg-white overflow-hidden rounded-md border-solid border-1.5 border-gray-2 duration-300 hover:border-blue-500">
                <div className="h-full w-72 overflow-hidden">
                  <img className="w-full h-full object-cover duration-300 group-hover:scale-110" src="banner.jpeg"></img>
                </div>
                <div className="flex-1 h-full p6 flex flex-col justify-between">
                  <div className="w-full flex justify-start">
                    {/* 可以通过伪元素实现，但是用 tailwindcss 就没必要了 */}
                    <p id="title" className="relative text-5 font-500 text-blue-500 group">
                      {title}
                      <span className="absolute bottom--1 left-0 h.5 w0 bg-blue-500 h1 duration-300 group-hover:w-full"></span>
                    </p>
                  </div>
                  <p id="synopsis" className="text-3.5 line-height-relaxed text-gray-500 w-full overflow-hidden overflow-ellipsis line-clamp-3">
                  在《西游记》中，唐僧师徒四人分别是唐僧、孙悟空、猪八戒和沙僧。唐僧是取经的主角，性格仁慈，信仰坚定；孙悟空是他的徒弟，拥有强大的法力和战斗能力，性格机智勇敢；猪八戒则是个好吃懒做的角色，常常因贪吃而惹出麻烦；沙僧则是忠厚老实，默默奉献的角色。四人一路上经历了九九八十一难，遇到了各种妖魔鬼怪，孙悟空凭借他的法力和智慧，屡次化险为夷。故事中不仅有精彩的打斗场面，还有深刻的哲理，展现了人性中的善与恶、正义与邪恶的斗争。最终，唐僧师徒成功取得真经，回到大唐，弘扬佛法，造福众生。这个故事不仅富有娱乐性，还蕴含了丰富的文化内涵，深受读者喜爱。
                  </p>
                  <div className="flex justify-between">
                    <span className="py-.5 px-5 text-2.75 line-height-none bg-orange-500 rounded-full text-white flex items-center">JavaScript</span>
                    <span className="py-.5 text-gray-6">{date}</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          <div>
            <p className="text-gray-6 flex gap-x-2 flex items-center">
              更多文章，请前往
              <Link to="/articles" className="relative text-blue-500 flex items-center gap-x-.5 group">
                <img src="./more.svg" className="w-4" />
                文章
                <span className="absolute bottom--1 left-0 h.5 w0 bg-blue-500 h1 duration-300 group-hover:w-full"></span>
              </Link>
            </p>
          </div>
        </div>
        {/* More Message */}
      </div>
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