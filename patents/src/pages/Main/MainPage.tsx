import React from 'react';
import PostGrid from './components/PostGrid';

const MainPage: React.FC = () => {
  // Sample data inspired by the image
  const travelPosts = [
    {
      id: '1',
      title: 'A Guide To Mri Scans',
      description: 'Do you want to download free song for ipod? If so, reading this article could save you from',
      category: 'UX',
      date: '21 Oct 2018',
      categoryColor: 'orange'
    },
    {
      id: '2',
      title: 'What Is Hdcp',
      description: 'Every avid independent filmmaker has dreamed about making that special interest',
      category: 'UX',
      date: '21 Oct 2018',
      categoryColor: 'orange'
    },
    {
      id: '3',
      title: 'Sony Laptops Are Still Part Of The Sony Family',
      description: 'Every avid independent filmmaker has dreamed about making that special interest',
      category: 'UX',
      date: '21 Oct 2018',
      categoryColor: 'orange'
    }
  ];

  const designPosts = [
    {
      id: '4',
      title: 'Compatible Inkjet Cartridge Which One Will You Choose',
      description: 'Every avid independent filmmaker has dreamed about making that special interest',
      category: 'UX',
      date: '21 Oct 2018',
      categoryColor: 'orange'
    },
    {
      id: '5',
      title: 'Compatible Inkjet Cartridge Which One Will You Choose',
      description: 'Every avid independent filmmaker has dreamed about making that special interest',
      category: 'UX',
      date: '21 Oct 2018',
      categoryColor: 'orange'
    },
    {
      id: '6',
      title: 'How Does An Lcd Screen Work',
      description: 'Every avid independent filmmaker has dreamed about making that special interest',
      category: 'UX',
      date: '21 Oct 2018',
      categoryColor: 'orange'
    }
  ];

  const miscPosts = [
    {
      id: '7',
      title: 'Cleaning And Organizing',
      description: 'Every avid independent filmmaker has dreamed about making that special interest',
      category: 'UX',
      date: '21 Oct 2018',
      categoryColor: 'orange'
    },
    {
      id: '8',
      title: 'Choosing The Best Audio Player Software For Your Computer',
      description: 'Every avid independent filmmaker has dreamed about making that special interest',
      category: 'UX',
      date: '21 Oct 2018',
      categoryColor: 'orange'
    },
    {
      id: '9',
      title: 'Make Myspace Your Best Designed Space',
      description: 'Every avid independent filmmaker has dreamed about making that special interest',
      category: 'UX',
      date: '21 Oct 2018',
      categoryColor: 'orange'
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <PostGrid posts={travelPosts} categoryTitle="Travels" />
      <PostGrid posts={[...designPosts, ...miscPosts]} categoryTitle="Design" />
    </div>
  );
};

export default MainPage; 