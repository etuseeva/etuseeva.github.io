import React from 'react';
import { Button, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import CalculatorTab from './components/CalculatorTab';
import ArticleTab from './components/ArticleTab';

interface CalculationResult {
  epsilon: number;
  psi: number;
  f1: number;
  f2: number;
  Q1: number;
  Q2: number;
}

const PatentPage: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = React.useState<CalculationResult | null>(null);

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

  const calculateCardiacFunction = (values: { ac: number; ic: number; em: number; er: number }) => {
    const { ac, ic, em, er } = values;
    
    // Calculate ε (epsilon)
    const epsilon = Math.pow(1 + em / (ac + ic), 1/5);
    
    // Calculate ψ (psi)
    const psi = Math.pow(1 + (em * er) / (ac * ic), 1/5);
    
    // Calculate f₁(ε)
    const f1 = 1/6 + 1.5 * Math.pow(epsilon, 5) - (5/3) * Math.pow(epsilon, 3);
    
    // Calculate f₂(ε, ψ)
    const f2 = (1/8) * (
      (335/3) * Math.pow(epsilon, 2) * Math.pow(psi, 3) - 
      (225/2) * epsilon * Math.pow(psi, 4) + 
      27 * Math.pow(psi, 5) - 
      (157/6) * Math.pow(epsilon, 5)
    );
    
    // Calculate Q₁
    const Q1 = 100 / (1 + f2 / f1);
    
    // Calculate Q₂
    const Q2 = 100 - Q1;
    
    setResults({ epsilon, psi, f1, f2, Q1, Q2 });
  };

  const tabItems = [
    {
      key: 'calculator',
      label: 'Расчет показателей',
      children: <CalculatorTab onCalculate={calculateCardiacFunction} results={results} />,
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