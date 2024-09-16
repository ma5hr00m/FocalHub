import React from "react";
import PhotoWall from "@/components/Function/PhotoWall";

interface GalleryProps {}

const Gallery: React.FC<GalleryProps> = () => {
  const images = [
    { preview: 'https://img.ma5hr00m.top/main/projects/01.jpg', title: 'Image 1' },
    { preview: 'https://img.ma5hr00m.top/main/projects/02.jpg', title: 'Image 2' },
    { preview: 'https://img.ma5hr00m.top/main/projects/03.jpg', title: 'Image 3' },
    { preview: 'https://img.ma5hr00m.top/main/projects/04.jpg', title: 'Image 4' },
    { preview: 'https://img.ma5hr00m.top/main/projects/05.jpg', title: 'Image 5' },
    { preview: 'https://img.ma5hr00m.top/main/projects/06.jpg', title: 'Image 6' },
    { preview: 'https://img.ma5hr00m.top/main/projects/07.jpg', title: 'Image 7' },
    { preview: 'https://img.ma5hr00m.top/main/projects/08.jpg', title: 'Image 8' },
    { preview: 'https://img.ma5hr00m.top/main/projects/09.jpg', title: 'Image 9' },
    { preview: 'https://img.ma5hr00m.top/main/projects/10.jpg', title: 'Image 10' },
    { preview: 'https://img.ma5hr00m.top/main/projects/11.jpg', title: 'Image 11' },
    { preview: 'https://img.ma5hr00m.top/main/projects/12.jpg', title: 'Image 12' },
    { preview: 'https://img.ma5hr00m.top/main/projects/13.jpg', title: 'Image 13' },
    { preview: 'https://img.ma5hr00m.top/main/projects/14.jpg', title: 'Image 14' },
    { preview: 'https://img.ma5hr00m.top/main/projects/15.jpg', title: 'Image 15' },
    { preview: 'https://img.ma5hr00m.top/main/projects/16.jpg', title: 'Image 16' },
    { preview: 'https://img.ma5hr00m.top/main/projects/17.jpg', title: 'Image 17' },
    { preview: 'https://img.ma5hr00m.top/main/projects/18.jpg', title: 'Image 18' },
    { preview: 'https://img.ma5hr00m.top/main/projects/19.jpg', title: 'Image 19' },
    { preview: 'https://img.ma5hr00m.top/main/projects/20.jpg', title: 'Image 20' },
  ];

  const uniqueImages = Array.from(new Set(images.map(image => image.preview)))
    .map(preview => images.find(image => image.preview === preview)!);

  return (
    <div className="relative flex-1 w-full flex items-center justify-center">
      <div className="w-fit h-fit">
        <PhotoWall images={uniqueImages}/>
      </div>
    </div>
  )
}

export default Gallery