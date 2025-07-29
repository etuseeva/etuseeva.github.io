import React from 'react';
import { Button, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import { calculateBloodPressure } from '../../utils/patentCalculations';
import type { BloodPressureResults } from '../../utils/patentCalculations';
import CalculatorTab from './components/CalculatorTab';
import ArticleTab from './components/ArticleTab';

// Using BloodPressureResults from utils

const Patent876105Page: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = React.useState<BloodPressureResults | null>(null);

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

  const handleCalculateBloodPressure = (values: { ac: number; ic: number; em: number; rho: number }) => {
    const results = calculateBloodPressure(values);
    setResults(results);
  };

  const tabItems = [
    {
      key: 'calculator',
      label: 'Расчет давления',
      children: <CalculatorTab onCalculate={handleCalculateBloodPressure} results={results} />,
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

export default Patent876105Page; 