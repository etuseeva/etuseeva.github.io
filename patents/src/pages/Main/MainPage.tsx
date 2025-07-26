import React from 'react';
import { useNavigate } from 'react-router-dom';
import PostGrid from './components/PostGrid';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const patentPosts = [
    {
      id: 'patent-822812',
      title: 'ПАТЕНТ СССР № 822812',
      description: 'Способ определения функционального состояния миокарда левого желудочка сердца. Изобретение относится к медицине, а именно к способам диагностики сердечно-сосудистых заболеваний с повышенной точностью через измерение временных характеристик сердечного цикла.',
      onClick: () => navigate('/patent')
    }
  ];

  return (
    <div className="flex flex-col gap-4">
      <PostGrid posts={patentPosts} categoryTitle="Патенты" />
    </div>
  );
};

export default MainPage; 