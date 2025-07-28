import React from 'react';
import { Typography, Card, Form, Input, Button, Space, Alert, Divider, Row, Col } from 'antd';
import { CalculatorOutlined, ReloadOutlined, ClearOutlined } from '@ant-design/icons';
import { MathJax } from 'better-react-mathjax';

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

  const getInterpretation = (ps: number, pd: number) => {
    // Normal BP: systolic 90-120, diastolic 60-80
    if (ps >= 90 && ps <= 120 && pd >= 60 && pd <= 80) {
      return {
        type: 'success' as const,
        message: 'Нормальное артериальное давление',
        description: 'Систолическое и диастолическое давление в пределах нормы. Функция сердечно-сосудистой системы соответствует здоровому состоянию.'
      };
    } else if (ps > 140 || pd > 90) {
      return {
        type: 'error' as const,
        message: 'Артериальная гипертензия',
        description: 'Повышенное артериальное давление. Рекомендуется консультация кардиолога и дополнительное обследование.'
      };
    } else if (ps < 90 || pd < 60) {
      return {
        type: 'warning' as const,
        message: 'Артериальная гипотензия',
        description: 'Пониженное артериальное давление. Может указывать на нарушение сердечно-сосудистой функции.'
      };
    } else {
      return {
        type: 'info' as const,
        message: 'Пограничные значения',
        description: 'Артериальное давление находится в пограничной зоне. Рекомендуется регулярный мониторинг.'
      };
    }
  };

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
              <Space direction="vertical" className="w-full">
                <Alert
                  message={getInterpretation(results.ps, results.pd).message}
                  description={getInterpretation(results.ps, results.pd).description}
                  type={getInterpretation(results.ps, results.pd).type}
                  showIcon
                />

                <Card size="small" title="Артериальное давление">
                  <Row justify="center" gutter={[32, 16]}>
                    <Col span={8}>
                      <Title level={3} className="text-red-500">
                        <MathJax>{`$P_s = ${results.ps.toFixed(1)}$`}</MathJax>
                      </Title>
                      <Text type="secondary">Систолическое<br/>мм рт.ст.</Text>
                    </Col>
                    <Col span={8}>
                      <Title level={3} className="text-blue-500">
                        <MathJax>{`$P_d = ${results.pd.toFixed(1)}$`}</MathJax>
                      </Title>
                      <Text type="secondary">Диастолическое<br/>мм рт.ст.</Text>
                    </Col>
                    <Col span={8}>
                      <Title level={3} className="text-green-500">
                        <MathJax>{`$\\Delta P = ${results.deltaP.toFixed(1)}$`}</MathJax>
                      </Title>
                      <Text type="secondary">Пульсовое<br/>мм рт.ст.</Text>
                    </Col>
                  </Row>
                </Card>

                <Card size="small" title="Расчетные параметры">
                  <Row gutter={[16, 16]}>
                    <Col span={12}>
                      <Text type="secondary">Параметр d₁:</Text>
                      <div className="text-lg font-medium">{results.d1.toFixed(4)}</div>
                    </Col>
                    <Col span={12}>
                      <Text type="secondary">F(d,g):</Text>
                      <div className="text-lg font-medium">{results.fValue.toFixed(2)} м/с²</div>
                    </Col>
                  </Row>
                </Card>

                <Card size="small" title="Формулы расчета">
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
                        <MathJax>{`$$P_s = \\frac{5}{3} P_d = \\frac{5}{3} \\times ${results.pd} = ${results.ps.toFixed(1)} \\text{ мм рт.ст.}$$`}</MathJax>
                      </div>
                    </div>
                  </Space>
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