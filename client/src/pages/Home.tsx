import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

interface LinkInfo {
  href: string;
  icon: React.ReactNode;
}

interface HomeProps {
  links: LinkInfo[];
}

const Home: React.FC<HomeProps> = ({ links }) => {
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // 获取更新时间的函数
  const fetchLastUpdated = async () => {
    try {
      const response = await fetch("/api/v1/repo/ma5hr00m/focalhub/last-updated");
      if (!response.ok) {
        throw new Error("网络响应不正常");
      }
      const data = await response.json();
      const date = data.last_updated.split(" ")[0];
      setLastUpdated(date);
    } catch (err) {
      setError(err instanceof Error ? err.message : "发生错误");
    }
  };

  // 使用 useEffect 在组件挂载时获取更新时间
  useEffect(() => {
    fetchLastUpdated();
  }, []);

  return (
    <div className="relative w-full h-screen flex justify-center items-center bg-[#E9F4FD]">
      <div className="">
        <div className="m-2 w-90 h-fit flex flex-col rounded-md overflow-hidden gap-x-5 justify-between">
          {/* 基本信息 */}
          <div className="p8 bg-white">
            <div className="flex gap-x-3">
              <div className="w-12 h-12 rounded-md overflow-hidden">
                <img
                  className="w-full h-full"
                  src="https://q1.qlogo.cn/g?b=qq&nk=3411281455&s=640"
                  alt=""
                />
              </div>
              <div className="h-12 flex flex-col justify-between items-start">
                <span className="text-5 font-600">阿菇kinoko</span>
                <span className="text-3.5">在平淡的生活中创造不平淡</span>
              </div>
            </div>
          </div>
          {/* 相关链接 */}
          <div className="grid grid-cols-3 gap-4 p8 pt0 bg-white">
            {links.map((link, index) => {
              const isExternalLink = link.href.startsWith("http");
              return isExternalLink ? (
                <a
                  key={index}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="h-18 bg-gray-1 rounded-md flex flex-col justify-center items-center gap-y-2 color-gray-6 visited:color-gray-6 duration-300 hover:bg-gray-2 hover:color-gray-7"
                >
                  {link.icon}
                </a>
              ) : (
                <Link
                  key={index}
                  to={link.href}
                  className="h-18 bg-gray-1 rounded-md flex flex-col justify-center items-center gap-y-2 color-gray-6 visited:color-gray-6 duration-300 hover:bg-gray-2 hover:color-gray-7"
                >
                  {link.icon}
                </Link>
              );
            })}
          </div>
          {/* 更新时间 */}
          <div className="p8 pt0 bg-white">
            <div className="flex justify-end">
              {error ? (
                <span className="text-red-500 text-3.5 tracking-normal">{error}</span>
              ) : (
                <span className="text-gray-6 text-3.5 tracking-normal">
                  站点最近更新于 {lastUpdated || "加载中..."}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
