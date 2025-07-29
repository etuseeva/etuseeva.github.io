import React from 'react';
import { Typography, Card, Space, Alert, Row, Col } from 'antd';
import { MathJax } from 'better-react-mathjax';
import { getBloodPressureInterpretation } from '../utils/patentCalculations';
import type { BloodPressureResults } from '../utils/patentCalculations';

const { Text } = Typography;

interface BloodPressureResultsDisplayProps {
  results: BloodPressureResults;
  showTitle?: boolean;
  showFormulas?: boolean;
}

const BloodPressureResultsDisplay: React.FC<BloodPressureResultsDisplayProps> = ({ 
  results, 
  showTitle = true,
  showFormulas = true
}) => {
  const interpretation = getBloodPressureInterpretation(results.ps, results.pd);
  
  return (
    <Space direction="vertical" className="w-full">
      <Alert
        message={interpretation.message}
        description={interpretation.description}
        type={interpretation.type}
        showIcon
      />

      <Card title={showTitle ? "Артериальное давление" : "Давление"}>
        <Row justify="center" gutter={[32, 16]}>
          <Col>
            <div className="text-center">
              <div className="font-bold text-red-500 text-2xl">
                <MathJax>{`$P_s = ${results.ps.toFixed(1)}$`}</MathJax>
              </div>
              <Text type="secondary">Систолическое<br/>мм рт.ст.</Text>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <div className="font-bold text-blue-500 text-2xl">
                <MathJax>{`$P_d = ${results.pd.toFixed(1)}$`}</MathJax>
              </div>
              <Text type="secondary">Диастолическое<br/>мм рт.ст.</Text>
            </div>
          </Col>
          <Col>
            <div className="text-center">
              <div className="font-bold text-green-500 text-2xl">
                <MathJax>{`$\\Delta P = ${results.deltaP.toFixed(1)}$`}</MathJax>
              </div>
              <Text type="secondary">Пульсовое<br/>мм рт.ст.</Text>
            </div>
          </Col>
        </Row>
      </Card>

      <Card title="Расчетные параметры">
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <Text type="secondary">Параметр d₁:</Text>
            <div className="font-medium text-lg">{results.d1.toFixed(4)}</div>
          </Col>
          <Col span={12}>
            <Text type="secondary">F(d,g):</Text>
            <div className="font-medium text-lg">{results.fValue.toFixed(2)} м/с²</div>
          </Col>
        </Row>
      </Card>

      {showFormulas && (
        <Card title="Формулы расчета">
          <Space direction="vertical" className="w-full">
            <div>
              <Text type="secondary">Параметр d₁:</Text>
              <div className="bg-gray-50 p-2 rounded">
                <MathJax>{`$$d_1 = \\left(1 + \\frac{E_m}{AC + IC}\\right)^{0.2} = ${results.d1.toFixed(4)}$$`}</MathJax>
              </div>
            </div>
            <div>
              <Text type="secondary">Систолическое давление:</Text>
              <div className="bg-gray-50 p-2 rounded">
                <MathJax>{`$$P_s = \\frac{5}{3} P_d = \\frac{5}{3} \\times ${results.pd.toFixed(1)} = ${results.ps.toFixed(1)} \\text{ мм рт.ст.}$$`}</MathJax>
              </div>
            </div>
          </Space>
        </Card>
      )}
    </Space>
  );
};

export default BloodPressureResultsDisplay; 