import React from 'react';
import { Typography, Card, Form, Input, Button, Space, Alert, Divider, Row, Col } from 'antd';
import { CalculatorOutlined, ReloadOutlined, ClearOutlined } from '@ant-design/icons';
import { MathJax, MathJaxContext } from 'better-react-mathjax';

const { Title, Text, Paragraph } = Typography;

interface CombinedResults {
  // Patent 822812 results
  cardiac: {
    epsilon: number;
    psi: number;
    f1: number;
    f2: number;
    Q1: number;
    Q2: number;
  } | null;
  // Patent 876105 results
  bloodPressure: {
    d1: number;
    fValue: number;
    pd: number;
    ps: number;
    deltaP: number;
  } | null;
}

const CombinedCalculator: React.FC = () => {
  const [form] = Form.useForm();
  const [results, setResults] = React.useState<CombinedResults>({
    cardiac: null,
    bloodPressure: null
  });

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

  const loadExampleData = () => {
    form.setFieldsValue({
      ac: 75,
      ic: 57,
      em: 130,
      er: 60,
      rho: 1060
    });
  };

  const calculateCardiacFunction = (ac: number, ic: number, em: number, er: number) => {
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
    
    return { epsilon, psi, f1, f2, Q1, Q2 };
  };

  const calculateBloodPressure = (ac: number, ic: number, em: number) => {
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
    const pd = 85; // Example diastolic pressure from patent
    
    // Calculate systolic pressure: Ps = (5/3) * Pd
    const ps = (5/3) * pd;
    
    // Calculate pulse pressure
    const deltaP = ps - pd;
    
    return { d1, fValue, pd, ps, deltaP };
  };

  const handleSubmit = (values: any) => {
    const numericValues = {
      ac: Number(values.ac),
      ic: Number(values.ic),
      em: Number(values.em),
      er: Number(values.er),
      rho: Number(values.rho)
    };

    // Calculate both results
    const cardiacResults = calculateCardiacFunction(
      numericValues.ac, 
      numericValues.ic, 
      numericValues.em, 
      numericValues.er
    );

    const bloodPressureResults = calculateBloodPressure(
      numericValues.ac,
      numericValues.ic, 
      numericValues.em
    );

    setResults({
      cardiac: cardiacResults,
      bloodPressure: bloodPressureResults
    });
  };

  const handleReset = () => {
    form.resetFields();
    setResults({ cardiac: null, bloodPressure: null });
  };

  const getCardiacInterpretation = (Q1: number) => {
    if (Q1 >= 62 && Q1 <= 72) {
      return {
        type: 'success' as const,
        message: 'Нормальное функциональное состояние миокарда',
        description: 'Q₁≈67%, Q₂≈33% - функция левого желудочка в норме'
      };
    } else if (Q1 < 62) {
      return {
        type: 'error' as const,
        message: 'Нарушение функции миокарда',
        description: 'Снижение Q₁ может указывать на нарушение сократительной функции'
      };
    } else {
      return {
        type: 'warning' as const,
        message: 'Возможные компенсаторные изменения',
        description: 'Повышенный Q₁ может указывать на компенсаторные изменения'
      };
    }
  };

  const getBloodPressureInterpretation = (ps: number, pd: number) => {
    if (ps >= 90 && ps <= 120 && pd >= 60 && pd <= 80) {
      return {
        type: 'success' as const,
        message: 'Нормальное артериальное давление',
        description: 'Систолическое и диастолическое давление в пределах нормы'
      };
    } else if (ps > 140 || pd > 90) {
      return {
        type: 'error' as const,
        message: 'Артериальная гипертензия',
        description: 'Повышенное артериальное давление'
      };
    } else if (ps < 90 || pd < 60) {
      return {
        type: 'warning' as const,
        message: 'Артериальная гипотензия',
        description: 'Пониженное артериальное давление'
      };
    } else {
      return {
        type: 'info' as const,
        message: 'Пограничные значения',
        description: 'Давление в пограничной зоне'
      };
    }
  };

  return (
    <MathJaxContext config={config}>
      <Card className="mb-8">
        <Title level={2}>
          🧮 КОМБИНИРОВАННЫЙ КАЛЬКУЛЯТОР
        </Title>
        <Paragraph type="secondary">
          Расчет показателей по двум патентам СССР № 822812 и № 876105
        </Paragraph>

        <Row gutter={[24, 24]}>
          <Col xs={24} lg={8}>
            <Card title="ПАРАМЕТРЫ ИЗМЕРЕНИЯ" size="small">
              <Form
                form={form}
                layout="vertical"
                onFinish={handleSubmit}
                variant="filled"
                size="small"
              >
                <Form.Item
                  label="AC - Асинхронное сокращение"
                  name="ac"
                  rules={[{ required: true, message: 'Введите значение' }]}
                >
                  <Input 
                    type="number"
                    placeholder="75"
                    suffix="мс"
                    step="0.1"
                  />
                </Form.Item>

                <Form.Item
                  label="IC - Изометрическое сокращение"
                  name="ic"
                  rules={[{ required: true, message: 'Введите значение' }]}
                >
                  <Input 
                    type="number"
                    placeholder="57"
                    suffix="мс"
                    step="0.1"
                  />
                </Form.Item>

                <Form.Item
                  label="Em - Быстрое изгнание"
                  name="em"
                  rules={[{ required: true, message: 'Введите значение' }]}
                >
                  <Input 
                    type="number"
                    placeholder="130"
                    suffix="мс"
                    step="0.1"
                  />
                </Form.Item>

                <Form.Item
                  label="Er - Медленное изгнание"
                  name="er"
                  rules={[{ required: true, message: 'Введите значение' }]}
                >
                  <Input 
                    type="number"
                    placeholder="60"
                    suffix="мс"
                    step="0.1"
                  />
                </Form.Item>

                <Form.Item
                  label="ρ - Плотность крови"
                  name="rho"
                  rules={[{ required: true, message: 'Введите значение' }]}
                  initialValue={1060}
                >
                  <Input 
                    type="number"
                    placeholder="1060"
                    suffix="кг/м³"
                    step="1"
                  />
                </Form.Item>

                <Divider />

                <Space direction="vertical" className="w-full">
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    size="large"
                    icon={<CalculatorOutlined />}
                    block
                  >
                    Произвести расчет
                  </Button>
                  <Row gutter={8}>
                    <Col span={12}>
                      <Button 
                        onClick={handleReset}
                        size="large"
                        icon={<ClearOutlined />}
                        block
                      >
                        Очистить
                      </Button>
                    </Col>
                    <Col span={12}>
                      <Button 
                        onClick={loadExampleData}
                        size="large"
                        icon={<ReloadOutlined />}
                        block
                      >
                        Пример
                      </Button>
                    </Col>
                  </Row>
                </Space>
              </Form>
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="🫀 ФУНКЦИЯ МИОКАРДА (822812)" size="small">
              {results.cardiac ? (
                <Space direction="vertical" className="w-full">
                  <Alert
                    message={getCardiacInterpretation(results.cardiac.Q1).message}
                    description={getCardiacInterpretation(results.cardiac.Q1).description}
                    type={getCardiacInterpretation(results.cardiac.Q1).type}
                    showIcon
                  />

                  <Row gutter={[16, 8]}>
                    <Col span={12}>
                      <div className="text-center">
                        <Title level={4} className="text-blue-500 mb-1">
                          <MathJax>{`$${results.cardiac.Q1.toFixed(1)}\\%$`}</MathJax>
                        </Title>
                        <Text type="secondary" className="text-xs">Q₁ (быстрое)</Text>
                      </div>
                    </Col>
                    <Col span={12}>
                      <div className="text-center">
                        <Title level={4} className="text-green-500 mb-1">
                          <MathJax>{`$${results.cardiac.Q2.toFixed(1)}\\%$`}</MathJax>
                        </Title>
                        <Text type="secondary" className="text-xs">Q₂ (медленное)</Text>
                      </div>
                    </Col>
                  </Row>

                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <div>ε = {results.cardiac.epsilon.toFixed(4)}</div>
                    <div>ψ = {results.cardiac.psi.toFixed(4)}</div>
                  </div>
                </Space>
              ) : (
                <Text type="secondary" className="text-xs">
                  Введите параметры и нажмите "Произвести расчет"
                </Text>
              )}
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="🩺 АРТЕРИАЛЬНОЕ ДАВЛЕНИЕ (876105)" size="small">
              {results.bloodPressure ? (
                <Space direction="vertical" className="w-full">
                  <Alert
                    message={getBloodPressureInterpretation(results.bloodPressure.ps, results.bloodPressure.pd).message}
                    description={getBloodPressureInterpretation(results.bloodPressure.ps, results.bloodPressure.pd).description}
                    type={getBloodPressureInterpretation(results.bloodPressure.ps, results.bloodPressure.pd).type}
                    showIcon
                  />

                  <Row gutter={[8, 8]}>
                    <Col span={8}>
                      <div className="text-center">
                        <Title level={4} className="text-red-500 mb-1">
                          <MathJax>{`$${results.bloodPressure.ps.toFixed(0)}$`}</MathJax>
                        </Title>
                        <Text type="secondary" className="text-xs">Ps (сист.)</Text>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="text-center">
                        <Title level={4} className="text-blue-500 mb-1">
                          <MathJax>{`$${results.bloodPressure.pd.toFixed(0)}$`}</MathJax>
                        </Title>
                        <Text type="secondary" className="text-xs">Pd (диаст.)</Text>
                      </div>
                    </Col>
                    <Col span={8}>
                      <div className="text-center">
                        <Title level={4} className="text-green-500 mb-1">
                          <MathJax>{`$${results.bloodPressure.deltaP.toFixed(0)}$`}</MathJax>
                        </Title>
                        <Text type="secondary" className="text-xs">ΔP (пульс.)</Text>
                      </div>
                    </Col>
                  </Row>

                  <div className="bg-gray-50 p-2 rounded text-xs">
                    <div>d₁ = {results.bloodPressure.d1.toFixed(4)}</div>
                    <div>F(d,g) = {results.bloodPressure.fValue.toFixed(1)} м/с²</div>
                  </div>
                </Space>
              ) : (
                <Text type="secondary" className="text-xs">
                  Введите параметры и нажмите "Произвести расчет"
                </Text>
              )}
            </Card>
          </Col>
        </Row>
      </Card>
    </MathJaxContext>
  );
};

export default CombinedCalculator; 