import React from 'react';
import { Typography, Card, Space, Divider, Row, Col, List } from 'antd';
import { MathJax } from 'better-react-mathjax';

const { Title, Text, Paragraph } = Typography;

const ArticleTab: React.FC = () => {
  return (
    <Card>
      <Title level={1}>
        ПАТЕНТ СССР № 822812
      </Title>
      
      <Title level={2} type="secondary">
        СПОСОБ ОПРЕДЕЛЕНИЯ ФУНКЦИОНАЛЬНОГО СОСТОЯНИЯ МИОКАРДА ЛЕВОГО ЖЕЛУДОЧКА СЕРДЦА
      </Title>

      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Text strong>Дата публикации:</Text> 23.04.81<br />
          <Text strong>Бюллетень № 15</Text><br />
          <Text strong>Дата опубликования описания:</Text> 23.04.81
        </div>

        <Divider />

        <div>
          <Title level={3}>АВТОРЫ ИЗОБРЕТЕНИЯ</Title>
          <Paragraph>
            Г. М. Поздняков, А. В. Берестовкин, С. И. Попомарев, О. К. Струмскиг
          </Paragraph>
        </div>

        <div>
          <Title level={3}>ЗАЯВИТЕЛИ</Title>
          <Paragraph>
            Центр подготовки космонавтов им. Ю. А. Гагарина и Лаборатория гемодинамики 
            Воронежского промышленного управления водопроводно-канализационного хозяйства
          </Paragraph>
        </div>

        <Divider />

        <div>
          <Title level={3}>ТЕОРЕТИЧЕСКОЕ ОБОСНОВАНИЕ</Title>
          
          <Title level={4}>ОБЛАСТЬ ПРИМЕНЕНИЯ</Title>
          <Paragraph>
            Изобретение относится к медицине, а именно к способам диагностики сердечно-сосудистых 
            заболеваний. Метод предназначен для определения функционального состояния миокарда 
            левого желудочка сердца с повышенной точностью.
          </Paragraph>

          <Title level={4}>ФИЗИОЛОГИЧЕСКИЕ ОСНОВЫ</Title>
          <Paragraph>
            Функциональное состояние миокарда левого желудочка сердца является ключевым показателем 
            сердечно-сосудистой системы. Сердечный цикл включает несколько фаз:
          </Paragraph>
          <List
            dataSource={[
              { title: 'Фаза асинхронного сокращения (AC)', description: 'начальная фаза сокращения миокарда' },
              { title: 'Фаза изометрического сокращения (IC)', description: 'сокращение при закрытых клапанах' },
              { title: 'Фаза быстрого изгнания (Em)', description: 'основной выброс крови из желудочка' },
              { title: 'Фаза медленного изгнания (Er)', description: 'завершающая фаза выброса' }
            ]}
            renderItem={item => (
              <List.Item>
                <Text>• </Text><Text strong>{item.title}</Text> - {item.description}
              </List.Item>
            )}
          />
        </div>

        <div>
          <Title level={4}>ПРОБЛЕМА СУЩЕСТВУЮЩИХ МЕТОДОВ</Title>
          <Paragraph>
            <Text strong>Недостатки известных способов:</Text>
          </Paragraph>
          <List
            dataSource={[
              'Низкая точность определения функционального состояния миокарда',
              'Ограниченная информативность существующих методов диагностики',
              'Недостаточный учет временных характеристик сердечного цикла'
            ]}
            renderItem={item => <List.Item><Text>• </Text>{item}</List.Item>}
          />
        </div>

        <div>
          <Title level={4}>СУТЬ ПРЕДЛАГАЕМОГО МЕТОДА</Title>
          <Paragraph>
            Предлагаемый способ определения функционального состояния миокарда левого желудочка 
            сердца основан на измерении объема сердца по <Text strong>диастолическим фазам быстрого 
            и медленного изгнания</Text> с дополнительным измерением <Text strong>диастолических фаз 
            асинхронного и изометрического сокращения</Text>.
          </Paragraph>

          <Paragraph>
            <Text strong>Ключевые особенности метода:</Text>
          </Paragraph>
          <List
            dataSource={[
              { title: 'Комплексный подход', description: 'учет всех основных фаз сердечного цикла' },
              { title: 'Математическое моделирование', description: 'использование сложных функциональных зависимостей' },
              { title: 'Количественная оценка', description: 'определение процентного соотношения объемов крови' },
              { title: 'Неинвазивность', description: 'измерения проводятся без хирургического вмешательства' }
            ]}
            renderItem={item => (
              <List.Item>
                <Text>• </Text><Text strong>{item.title}</Text> - {item.description}
              </List.Item>
            )}
          />
        </div>

        <Divider />

        <div>
          <Title level={3}>МАТЕМАТИЧЕСКИЕ ФОРМУЛЫ</Title>
          
          <Card className="bg-gray-50">
            <Title level={5}>Основная формула для определения объема крови в фазу быстрого изгнания:</Title>
            <div className="text-center">
              <MathJax>{"$$Q_1 = 100 \\cdot F(AC, IC, E_m, E_r)$$"}</MathJax>
            </div>
          </Card>

          <Card className="bg-gray-50">
            <Title level={5}>Детализированная формула:</Title>
            <div className="text-center">
              <MathJax>{"$$Q_1 = \\frac{100}{1 + \\frac{f_2(\\varepsilon,\\psi)}{f_1(\\varepsilon)}}$$"}</MathJax>
            </div>
          </Card>

          <Card className="bg-gray-50">
            <Title level={5}>Связь между объемами:</Title>
            <div className="text-center">
              <MathJax>{"$$Q_2 = 100 - Q_1$$"}</MathJax>
            </div>
          </Card>

          <Card className="bg-gray-50">
            <Title level={5}>Функции f₁(ε) и f₂(ε,ψ):</Title>
            <div className="text-center">
              <MathJax>{"$$f_1(\\varepsilon) = \\frac{1}{6} + 1{,}5 \\cdot \\varepsilon^{5} - \\frac{5}{3} \\cdot \\varepsilon^{3}$$"}</MathJax>
            </div>
            <div className="text-center">
              <MathJax>{"$$f_2(\\varepsilon, \\psi) = \\frac{1}{8} \\cdot \\left[\\frac{335}{3} \\cdot \\varepsilon^{2} \\cdot \\psi^{3} - \\frac{225}{2} \\cdot \\varepsilon \\cdot \\psi^{4} + 27 \\cdot \\psi^{5} - \\frac{157}{6} \\cdot \\varepsilon^{5}\\right]$$"}</MathJax>
            </div>
          </Card>

          <Card className="bg-gray-50">
            <Title level={5}>Определение параметров:</Title>
            <div className="text-center">
              <MathJax>{"$$\\varepsilon = \\left(1 + \\frac{E_m}{AC + IC}\\right)^{\\frac{1}{5}}$$"}</MathJax>
            </div>
            <div className="text-center">
              <MathJax>{"$$\\psi = \\left(1 + \\frac{E_m \\cdot E_r}{AC \\cdot IC}\\right)^{\\frac{1}{5}}$$"}</MathJax>
            </div>
          </Card>
        </div>

        <Divider />

        <div>
          <Title level={3}>ЭКСПЕРИМЕНТАЛЬНЫЕ ДАННЫЕ</Title>
          
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card title="Группа здоровых людей">
                <div className="text-2xl font-bold text-green-600">
                  <MathJax>{"$Q_1 = 67\\%$"}</MathJax>
                </div>
                <div className="text-2xl font-bold text-blue-600">
                  <MathJax>{"$Q_2 = 33\\%$"}</MathJax>
                </div>
              </Card>
            </Col>
            
            <Col xs={24} md={12}>
              <Card title="Группа пациентов с заболеваниями">
                <div className="text-2xl font-bold text-red-600">
                  <MathJax>{"$Q_1 = 55\\%$"}</MathJax>
                </div>
                <div className="text-2xl font-bold text-orange-600">
                  <MathJax>{"$Q_2 = 45\\%$"}</MathJax>
                </div>
              </Card>
            </Col>
          </Row>
        </div>

        <Divider />

        <div>
          <Title level={3}>ПРЕИМУЩЕСТВА ПРЕДЛАГАЕМОГО СПОСОБА</Title>
          <List
            dataSource={[
              { title: 'Повышение точности', description: 'определения функционального состояния миокарда левого желудочка сердца' },
              { title: 'Возможность получения более широкой информации', description: 'о состоянии сердечно-сосудистой системы пациента' },
              { title: 'Неинвазивность метода', description: 'все измерения проводятся без хирургического вмешательства' }
            ]}
            renderItem={(item, index) => (
              <List.Item>
                <Text>{index + 1}. </Text><Text strong>{item.title}</Text> - {item.description}
              </List.Item>
            )}
          />
        </div>

        <Divider />

        <div>
          <Title level={3}>КЛИНИЧЕСКОЕ ЗНАЧЕНИЕ</Title>
          <Paragraph>
            <Text strong>Диагностическая ценность метода:</Text>
          </Paragraph>
          <List
            dataSource={[
              { title: 'Ранняя диагностика', description: 'выявление нарушений на начальных стадиях' },
              { title: 'Мониторинг эффективности лечения', description: 'контроль динамики состояния пациента' },
              { title: 'Прогнозирование', description: 'оценка риска развития сердечно-сосудистых осложнений' },
              { title: 'Дифференциальная диагностика', description: 'различение типов сердечной патологии' }
            ]}
            renderItem={item => (
              <List.Item>
                <Text>• </Text><Text strong>{item.title}</Text> - {item.description}
              </List.Item>
            )}
          />
        </div>
      </Space>
    </Card>
  );
};

export default ArticleTab; 