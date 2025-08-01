import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import PostGrid from './components/PostGrid';
import CombinedCalculator from './components/CombinedCalculator';

const MainPage: React.FC = () => {
  const navigate = useNavigate();

  const config = {
    loader: { load: ["[tex]/html"] },
    tex: {
      packages: { "[+]": ["html"] },
      inlineMath: [
        ["$", "$"],
        ["\\(", "\\)"]
      ],
      displayMath: [
        ["$$", "$$"],
        ["\\[", "\\]"]
      ]
    }
  };

  const patentPosts = [
    {
      id: 'patent-822812',
      title: 'ПАТЕНТ СССР № 822812',
      description: 'Способ определения функционального состояния миокарда левого желудочка сердца. Изобретение относится к медицине, а именно к способам диагностики сердечно-сосудистых заболеваний с повышенной точностью через измерение временных характеристик сердечного цикла.',
      onClick: () => navigate('/patent')
    },
    {
      id: 'patent-876105',
      title: 'ПАТЕНТ СССР № 876105',
      description: 'Способ определения кровяного давления в восходящей аорте. Метод позволяет получить точную информацию о величинах систолического и диастолического давления бескровным путем с повышенной точностью через анализ фаз сердечного цикла.',
      onClick: () => navigate('/patent-876105')
    }
  ];

  return (
    <MathJaxContext config={config}>
      <div className="mx-auto p-6">
        <CombinedCalculator />
        <PostGrid posts={patentPosts} categoryTitle="ДОСТУПНЫЕ ПАТЕНТЫ" />
      </div>
    </MathJaxContext>
  );
};

export default MainPage; 