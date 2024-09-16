import React, { useEffect, useRef, useState } from 'react';

interface ImageData {
  preview: string;
  title: string;
}

interface PhotoWallProps {
  images: ImageData[];
}

const useColumnCount = () => {
  const [columnCount, setColumnCount] = useState<number>(4);

  useEffect(() => {
    const updateColumnCount = () => {
      const width = window.innerWidth;
      if (width <= 768) {
        setColumnCount(2);
      } else if (width <= 1024) {
        setColumnCount(3);
      } else {
        setColumnCount(4);
      }
    };

    updateColumnCount();
    window.addEventListener('resize', updateColumnCount);
    return () => window.removeEventListener('resize', updateColumnCount);
  }, []);

  return columnCount;
};

const useImageLoader = (images: ImageData[]) => {
  const [loadedImages, setLoadedImages] = useState<boolean[]>(Array(images.length).fill(false));
  const arr = useRef<HTMLDivElement[]>([]);
  const minHeight = useRef<number[]>(Array(4).fill(0)); // Default to 4 columns

  const handleScroll = () => {
    const newLoadedImages = [...loadedImages];
    images.forEach((_, index) => {
      if (!loadedImages[index] && isInViewport(index)) {
        newLoadedImages[index] = true;
      }
    });
    setLoadedImages(newLoadedImages);
  };

  const isInViewport = (index: number) => {
    const element = arr.current[index];
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return rect.top >= 0 && rect.bottom <= window.innerHeight;
  };

  const appendImageToColumn = (src: string) => {
    const minIndex = getMinHeightIndex();
    const imgElement = document.createElement('img');
    imgElement.src = src;
    imgElement.className = 'w-full opacity-0 transition-opacity duration-500 mb-3 rounded-sm border-solid border-1.5 border-gray-200';

    const container = arr.current[minIndex];
    if (container) {
      container.appendChild(imgElement);
      minHeight.current[minIndex] += imgElement.clientHeight;

      setTimeout(() => {
        imgElement.style.opacity = '1';
      }, 0);
    }
  };

  const getMinHeightIndex = () => {
    return minHeight.current.indexOf(Math.min(...minHeight.current));
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [loadedImages]);

  useEffect(() => {
    images.forEach((image) => {
      const img = new Image();
      img.src = image.preview;
      img.onload = () => appendImageToColumn(image.preview);
    });
  }, [images]);

  return { loadedImages, arr };
};

const PhotoWall: React.FC<PhotoWallProps> = ({ images }) => {
  const columnCount = useColumnCount();
  const { loadedImages, arr } = useImageLoader(images);

  return (
    <ul className="px-4 w-fit list-none flex">
      {Array.from({ length: columnCount }).map((_, index) => (
        <li key={index} className="w-52 my-3">
          <div ref={el => (arr.current[index] = el!)} className="w-full px-2">
            {images.map((image, imgIndex) => (
              loadedImages[imgIndex] && (
                <img
                  key={imgIndex}
                  src={image.preview}
                  className="w-full opacity-0 transition-opacity duration-500"
                  onLoad={(e) => (e.currentTarget.style.opacity = '1')}
                  alt={image.title}
                />
              )
            ))}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default PhotoWall;
