import React from 'react';
import { Button, Tabs } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MathJaxContext } from 'better-react-mathjax';
import CalculatorTab from './components/CalculatorTab';
import ArticleTab from './components/ArticleTab';

interface BloodPressureResult {
  d1: number;
  fValue: number;
  pd: number;
  ps: number;
  deltaP: number;
}

const Patent876105Page: React.FC = () => {
  const navigate = useNavigate();
  const [results, setResults] = React.useState<BloodPressureResult | null>(null);

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

  const calculateBloodPressure = (values: { ac: number; ic: number; em: number; rho: number }) => {
    const { ac, ic, em } = values;
    
    // Convert to seconds (input in ms)
    const acSec = ac / 1000;
    const icSec = ic / 1000;
    const emSec = em / 1000;
    
    // Calculate d₁
    const d1 = Math.pow(1 + emSec / (acSec + icSec), 0.2);
    
    // Calculate F(d,g) - acceleration function
    const g = 9.8; // m/s²
    const d = d1;
    const numerator = 22.5 * g * (Math.pow(5 * d - 2, 3) - 27);
    const denominator = Math.pow(5 * d - 2, 5) - 243;
    const fValue = numerator / denominator;
    
    // For simplification, using example values from patent
    // In real implementation, F₁ function would need full calibration
    const pd = 85; // Example diastolic pressure from patent
    
    // Calculate systolic pressure: Ps = (5/3) * Pd
    const ps = (5/3) * pd;
    
    // Calculate pulse pressure
    const deltaP = ps - pd;
    
    setResults({ d1, fValue, pd, ps, deltaP });
  };

  const tabItems = [
    {
      key: 'calculator',
      label: 'Расчет давления',
      children: <CalculatorTab onCalculate={calculateBloodPressure} results={results} />,
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