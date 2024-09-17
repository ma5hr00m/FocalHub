import React from "react";

interface WellcomeProps {}

const Wellcome: React.FC<WellcomeProps> = ({}) => {
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

  return (
    <div className='relative flex-1 w-full flex items-center justify-center'>
      <div className='w-220 min-w-60 px6 flex flex-col items-center'>
        {/* 欢迎 */}
        <div className="w-full h-120 flex flex-col items-center justify-center">
          <div className="profile flex flex-col items-center justify-center">
            <img src='https://img.ma5hr00m.top/main/emoticon/6.png' className='w-40' />
            <p className="text-7 font-600 mt4 mb0 text-gray-6">欢迎来到阿菇的站点</p>
            <p className="text-4 font-400 mt1 text-gray-6">希望用精巧的代码构建一个虚拟的国度</p>
            <div className="relative mt6 w-full max-w-120 h-fit flex justify-center items-center gap-x-4 gap-y-3 flex-wrap">
              {links.map((link, index) => (
                <a
                  key={index}
                  // className="box-border px4 py2 bg-green-4 hover:bg-green-5 rounded-sm text-white"
                  className="duration-300 box-border px4 h9 flex justify-center items-center border-solid border-1px border-gray-6 hover:border-green-5 hover:text-green-5 text-3.5 font-400 rounded-sm text-gray-6"
                  href={link.href}
                >
                  {link.text}
                </a>
              ))}
            </div>
          </div>
        </div>
        {/* 最近更新 */}
        <div className="bg-yellow w-full h-fit flex flex-col items-center">

        </div>
      </div>
    </div>
  );
}

export default Wellcome;
