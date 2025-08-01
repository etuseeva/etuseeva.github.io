import React from 'react';
import { Typography, Card, Form, Input, Button, Divider, Row, Col } from 'antd';
import { CalculatorOutlined, ReloadOutlined, ClearOutlined } from '@ant-design/icons';
import BloodPressureResultsDisplay from '../../../components/BloodPressureResultsDisplay';

const { Title, Text, Paragraph } = Typography;

interface CalculatorTabProps {
  onCalculate: (values: { ac: number; ic: number; em: number; rho: number }) => void;
  results: {
    d1: number;
    fValue: number;
    pd: number;
    ps: number;
    deltaP: number;
  } | null;
}

const CalculatorTab: React.FC<CalculatorTabProps> = ({ onCalculate, results }) => {
  const [form] = Form.useForm();

  const loadExampleData = () => {
    form.setFieldsValue({
      ac: 75,
      ic: 57,
      em: 130,
      rho: 1060
    });
  };

  const handleSubmit = (values: any) => {
    const numericValues = {
      ac: Number(values.ac),
      ic: Number(values.ic),
      em: Number(values.em),
      rho: Number(values.rho)
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
        ОПРЕДЕЛЕНИЕ КРОВЯНОГО ДАВЛЕНИЯ В ВОСХОДЯЩЕЙ АОРТЕ
      </Title>
      <Paragraph type="secondary">
        Патент СССР № 876105
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
                  placeholder="75"
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
                  placeholder="57"
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
                  placeholder="130"
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
              <BloodPressureResultsDisplay results={results} />
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