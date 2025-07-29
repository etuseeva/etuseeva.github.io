import React from 'react';
import { Typography, Card, Form, Input, Button, Divider, Row, Col } from 'antd';
import { CalculatorOutlined, ReloadOutlined, ClearOutlined } from '@ant-design/icons';
import CardiacResultsDisplay from '../../../components/CardiacResultsDisplay';

const { Title, Text, Paragraph } = Typography;

interface CalculatorTabProps {
  onCalculate: (values: { ac: number; ic: number; em: number; er: number }) => void;
  results: {
    epsilon: number;
    psi: number;
    f1: number;
    f2: number;
    Q1: number;
    Q2: number;
  } | null;
}

const CalculatorTab: React.FC<CalculatorTabProps> = ({ onCalculate, results }) => {
  const [form] = Form.useForm();

  const loadExampleData = () => {
    form.setFieldsValue({
      ac: 50,
      ic: 80,
      em: 120,
      er: 60
    });
  };

  const handleSubmit = (values: any) => {
    const numericValues = {
      ac: Number(values.ac),
      ic: Number(values.ic),
      em: Number(values.em),
      er: Number(values.er)
    };
    onCalculate(numericValues);
  };

  const handleReset = () => {
    form.resetFields();
  };

  // Using shared interpretation function from utils

  return (
    <Card>
      <Title level={2}>
        РАСЧЕТ ФУНКЦИОНАЛЬНОГО СОСТОЯНИЯ МИОКАРДА
      </Title>
      <Paragraph type="secondary">
        Патент СССР № 822812
      </Paragraph>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title="ПАРАМЕТРЫ ИЗМЕРЕНИЯ">
            <Form
              form={form}
              layout="vertical"
              onFinish={handleSubmit}
              variant="filled"
            >
              <Form.Item
                label="AC - Длительность фазы асинхронного сокращения"
                name="ac"
                rules={[{ required: true, message: 'Введите значение' }]}
              >
                <Input 
                  type="number"
                  placeholder="50"
                  suffix="мс"
                  step="0.1"
                />
              </Form.Item>

              <Form.Item
                label="IC - Длительность фазы изометрического сокращения"
                name="ic"
                rules={[{ required: true, message: 'Введите значение' }]}
              >
                <Input 
                  type="number"
                  placeholder="80"
                  suffix="мс"
                  step="0.1"
                />
              </Form.Item>

              <Form.Item
                label="Em - Длительность фазы быстрого изгнания"
                name="em"
                rules={[{ required: true, message: 'Введите значение' }]}
              >
                <Input 
                  type="number"
                  placeholder="120"
                  suffix="мс"
                  step="0.1"
                />
              </Form.Item>

              <Form.Item
                label="Er - Длительность фазы медленного изгнания"
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

              <Divider />

              <Row gutter={[8, 8]}>
                <Col xs={24} sm={12}>
                  <Button 
                    type="primary" 
                    htmlType="submit"
                    size="large"
                    icon={<CalculatorOutlined />}
                    block
                  >
                    Произвести расчет
                  </Button>
                  </Col>  
                  <Col xs={24} sm={12}>
                  <Button 
                    onClick={handleReset}
                    size="large"
                    icon={<ClearOutlined />}
                    block
                  >
                    Очистить
                  </Button>
                </Col>

                  <Col xs={24} sm={12}>
                <Button 
                  onClick={loadExampleData}
                  size="large"
                  icon={<ReloadOutlined />}
                  block
                >
                  Тестовые данные
                </Button>
                </Col>
              </Row>
            </Form>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title="РЕЗУЛЬТАТЫ АНАЛИЗА">
            {results ? (
              <CardiacResultsDisplay results={results} />
            ) : (
              <Typography.Text type="secondary">
                Введите параметры измерения и нажмите "Произвести расчет"
              </Typography.Text>
            )}
          </Card>
        </Col>
      </Row>
    </Card>
  );
};

export default CalculatorTab; 