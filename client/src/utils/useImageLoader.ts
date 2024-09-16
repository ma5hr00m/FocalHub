import { useEffect, useRef, useState } from 'react';

interface ImageData {
  preview: string;
  title: string;
}

// Abandoned
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
    imgElement.className = 'w-full opacity-0 transition-opacity duration-500 mb-3 rounded-sm border-solid border-1.5 border-gray-2 bg-gray-1';

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
    images.forEach((image, index) => {
      const img = new Image();
      img.src = image.preview;
      img.onload = () => {
        appendImageToColumn(image.preview);
        setLoadedImages(prev => {
          const newLoadedImages = [...prev];
          newLoadedImages[index] = true;
          return newLoadedImages;
        });
      };
    });
  }, [images]);

  return { loadedImages, arr };
};

export default useImageLoader;
