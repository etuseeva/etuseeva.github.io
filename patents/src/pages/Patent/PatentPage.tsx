import React from 'react';
import { Button, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import { calculateCardiacFunction } from '../../utils/patentCalculations';
import type { CardiacFunctionResults } from '../../utils/patentCalculations';
import CalculatorTab from './components/CalculatorTab';
import ArticleTab from './components/ArticleTab';

// Using CardiacFunctionResults from utils

const PatentPage: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = React.useState<CardiacFunctionResults | null>(null);

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

  const handleCalculateCardiacFunction = (values: { ac: number; ic: number; em: number; er: number }) => {
    const results = calculateCardiacFunction(values);
    setResults(results);
  };

  const tabItems = [
    {
      key: 'calculator',
      label: 'Расчет показателей',
      children: <CalculatorTab onCalculate={handleCalculateCardiacFunction} results={results} />,
    },
    {
      key: 'article',
      label: 'Описание метода',
      children: <ArticleTab />,
    },
  ];

  return (
    <MathJaxContext config={config}>
      <div className="max-w-6xl mx-auto p-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          Назад к главной
        </Button>

        <Tabs 
          defaultActiveKey="calculator" 
          items={tabItems}
          size="large"
        />
      </div>
    </MathJaxContext>
  );
};

export default PatentPage; 