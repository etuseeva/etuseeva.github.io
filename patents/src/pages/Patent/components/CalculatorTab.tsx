import React from 'react';
import { Typography, Card, Form, Input, Button, Space, Alert, Divider, Row, Col } from 'antd';
import { CalculatorOutlined, ReloadOutlined, ClearOutlined } from '@ant-design/icons';
import { MathJax } from 'better-react-mathjax';

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

  const getInterpretation = (Q1: number) => {
    if (Q1 >= 62 && Q1 <= 72) {
      return {
        type: 'success' as const,
        message: 'Нормальное функциональное состояние миокарда',
        description: 'Результаты соответствуют норме (здоровые: Q₁≈67%, Q₂≈33%). Функция левого желудочка сердца в пределах нормальных значений.'
      };
    } else if (Q1 < 62) {
      return {
        type: 'error' as const,
        message: 'Нарушение функции миокарда',
        description: 'Снижение объема быстрого изгнания (патология: Q₁≈55%, Q₂≈45%) может указывать на нарушение сократительной функции миокарда. Рекомендуется консультация кардиолога.'
      };
    } else {
      return {
        type: 'warning' as const,
        message: 'Возможные компенсаторные изменения',
        description: 'Повышенный объем быстрого изгнания может указывать на компенсаторные изменения в работе миокарда. Требуется дополнительное обследование.'
      };
    }
  };

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
              <Space direction="vertical" className="w-full">
                <Alert
                  message={getInterpretation(results.Q1).message}
                  description={getInterpretation(results.Q1).description}
                  type={getInterpretation(results.Q1).type}
                  showIcon
                />

                <Card size="small" title="Распределение объема крови">
                  <Row justify="center" gutter={[32, 0]}>
                    <Col>
                      <Title level={3} className="text-blue-500">
                        <MathJax>{`$Q_1 = ${results.Q1.toFixed(1)}\\%$`}</MathJax>
                      </Title>
                      <Text type="secondary">Фаза быстрого изгнания</Text>
                    </Col>
                    <Col>
                      <Title level={3} className="text-green-500">
                        <MathJax>{`$Q_2 = ${results.Q2.toFixed(1)}\\%$`}</MathJax>
                      </Title>
                      <Text type="secondary">Фаза медленного изгнания</Text>
                    </Col>
                  </Row>
                </Card>

                <Card size="small" title="Расчетные параметры">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Text type="secondary">Параметр ε:</Text>
                      <div className="text-lg font-medium">{results.epsilon.toFixed(4)}</div>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">Параметр ψ:</Text>
                      <div className="text-lg font-medium">{results.psi.toFixed(4)}</div>
                    </Col>
                  </Row>
                </Card>
              </Space>
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