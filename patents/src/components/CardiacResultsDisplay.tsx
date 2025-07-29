import React from 'react';
import { Typography, Card, Space, Alert, Row, Col } from 'antd';
import { MathJax } from 'better-react-mathjax';
import { getCardiacInterpretation } from '../utils/patentCalculations';
import type { CardiacFunctionResults } from '../utils/patentCalculations';

const { Text } = Typography;

interface CardiacResultsDisplayProps {
  results: CardiacFunctionResults;
  showTitle?: boolean;
}

const CardiacResultsDisplay: React.FC<CardiacResultsDisplayProps> = ({ 
  results, 
  showTitle = true 
}) => {
  const interpretation = getCardiacInterpretation(results.Q1);
  
  return (
    <Space direction="vertical" className="w-full">
      <Alert
        message={interpretation.message}
        description={interpretation.description}
        type={interpretation.type}
        showIcon
      />

      <Card title={showTitle ? "Распределение объема крови" : "Распределение объема"}>
        <Row justify="center" gutter={[32, 0]}>
          <Col>
            <div className="text-center">
              <div className="font-bold text-blue-500 text-2xl">
                <MathJax>{`$Q_1 = ${results.Q1.toFixed(1)}\\%$`}</MathJax>
              </div>
              <Text type="secondary">Фаза быстрого изгнания</Text>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <div className="font-bold text-green-500 text-2xl">
                <MathJax>{`$Q_2 = ${results.Q2.toFixed(1)}\\%$`}</MathJax>
              </div>
              <Text type="secondary">Фаза медленного изгнания</Text>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Расчетные параметры">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text type="secondary">Параметр ε:</Text>
            <div className="font-medium text-lg">{results.epsilon.toFixed(4)}</div>
          </Col>
          <Col span={12}>
            <Text type="secondary">Параметр ψ:</Text>
            <div className="font-medium text-lg">{results.psi.toFixed(4)}</div>
          </Col>
        </Row>
      </Card>
    </Space>
  );
};

export default CardiacResultsDisplay; 