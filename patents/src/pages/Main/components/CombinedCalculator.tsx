import React from 'react';
import { Typography, Card, Form, Input, Button, Divider, Row, Col } from 'antd';
import { CalculatorOutlined, ReloadOutlined, ClearOutlined } from '@ant-design/icons';
import { calculateCombined } from '../../../utils/patentCalculations';
import type { CombinedResults, CombinedInputs } from '../../../utils/patentCalculations';
import CardiacResultsDisplay from '../../../components/CardiacResultsDisplay';
import BloodPressureResultsDisplay from '../../../components/BloodPressureResultsDisplay';

const { Title, Text, Paragraph } = Typography;

const CombinedCalculator: React.FC = () => {
  const [form] = Form.useForm();
  const [results, setResults] = React.useState<CombinedResults | null>(null);

  const loadExampleData = () => {
    form.setFieldsValue({
      ac: 75,
      ic: 57,
      em: 130,
      er: 60,
      rho: 1060
    });
  };

  const handleSubmit = (values: any) => {
    const numericValues: CombinedInputs = {
      ac: Number(values.ac),
      ic: Number(values.ic),
      em: Number(values.em),
      er: Number(values.er),
      rho: Number(values.rho)
    };
    const calculatedResults = calculateCombined(numericValues);
    setResults(calculatedResults);
  };

  const handleReset = () => {
    form.resetFields();
    setResults(null);
  };

  // Using shared interpretation functions from utils

  return (
    <Card className="mb-8">
      <Title level={2}>
        КОМПЛЕКСНЫЙ КАРДИОЛОГИЧЕСКИЙ АНАЛИЗ
      </Title>
      <Paragraph type="secondary">
        Совместное применение методов СССР № 822812 и № 876105
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

              <Row gutter={[8, 8]}>
                <Col span={24}>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    size="large"
                    icon={<CalculatorOutlined />}
                    block
                  >
                    Произвести анализ
                  </Button>
                </Col>
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
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="ФУНКЦИЯ МИОКАРДА (№ 822812)" size="small">
            {results ? (
              <CardiacResultsDisplay 
                results={results.cardiacFunction} 
                showTitle={false}
              />
            ) : (
              <Typography.Text type="secondary" className="text-sm">
                Результаты анализа функции миокарда
              </Typography.Text>
            )}
          </Card>
        </Col>

        <Col xs={24} lg={8}>
          <Card title="КРОВЯНОЕ ДАВЛЕНИЕ (№ 876105)" size="small">
            {results ? (
              <BloodPressureResultsDisplay 
                results={results.bloodPressure} 
                showTitle={false}
                showFormulas={false}
              />
            ) : (
              <Typography.Text type="secondary" className="text-sm">
                Результаты анализа кровяного давления
              </Typography.Text>
            )}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default CombinedCalculator; 