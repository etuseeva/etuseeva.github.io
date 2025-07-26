import React from 'react';
import { Button, Typography, Card, Space, Divider } from 'antd';
import { ArrowLeftOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { MathJaxContext, MathJax } from 'better-react-mathjax';

const { Title, Paragraph, Text } = Typography;

const PatentPage: React.FC = () => {
  const navigate = useNavigate();

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

  return (
    <MathJaxContext config={config}>
      <div className="max-w-4xl mx-auto p-6">
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          className="mb-6"
        >
          Назад к главной
        </Button>

        <Card>
          <Title level={1} className="text-center mb-6">
            ПАТЕНТ СССР № 822812
          </Title>
          
          <Title level={2} className="text-center mb-8" type="secondary">
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
              <ul className="ml-6">
                <li><Text strong>Фаза асинхронного сокращения (AC)</Text> - начальная фаза сокращения миокарда</li>
                <li><Text strong>Фаза изометрического сокращения (IC)</Text> - сокращение при закрытых клапанах</li>
                <li><Text strong>Фаза быстрого изгнания (Em)</Text> - основной выброс крови из желудочка</li>
                <li><Text strong>Фаза медленного изгнания (Er)</Text> - завершающая фаза выброса</li>
              </ul>
            </div>

            <div>
              <Title level={4}>ПРОБЛЕМА СУЩЕСТВУЮЩИХ МЕТОДОВ</Title>
              <Paragraph>
                <Text strong>Недостатки известных способов:</Text>
              </Paragraph>
              <ul className="ml-6">
                <li>Низкая точность определения функционального состояния миокарда</li>
                <li>Ограниченная информативность существующих методов диагностики</li>
                <li>Недостаточный учет временных характеристик сердечного цикла</li>
              </ul>
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
              <ul className="ml-6">
                <li><Text strong>Комплексный подход</Text> - учет всех основных фаз сердечного цикла</li>
                <li><Text strong>Математическое моделирование</Text> - использование сложных функциональных зависимостей</li>
                <li><Text strong>Количественная оценка</Text> - определение процентного соотношения объемов крови</li>
                <li><Text strong>Неинвазивность</Text> - измерения проводятся без хирургического вмешательства</li>
              </ul>
            </div>

            <Divider />

            <div>
              <Title level={3}>МАТЕМАТИЧЕСКИЕ ФОРМУЛЫ</Title>
              
              <Card className="bg-gray-50 mb-4">
                <Title level={5}>Основная формула для определения объема крови в фазу быстрого изгнания:</Title>
                <div className="text-center text-lg">
                  <MathJax>{"$$Q_1 = 100 \\cdot F(AC, IC, E_m, E_r)$$"}</MathJax>
                </div>
              </Card>

              <Card className="bg-gray-50 mb-4">
                <Title level={5}>Детализированная формула:</Title>
                <div className="text-center text-lg">
                  <MathJax>{"$$Q_1 = \\frac{100}{1 + \\frac{f_2(\\varepsilon,\\psi)}{f_1(\\varepsilon)}}$$"}</MathJax>
                </div>
              </Card>

              <Card className="bg-gray-50 mb-4">
                <Title level={5}>Связь между объемами:</Title>
                <div className="text-center text-lg">
                  <MathJax>{"$$Q_2 = 100 - Q_1$$"}</MathJax>
                </div>
              </Card>

              <Card className="bg-gray-50 mb-4">
                <Title level={5}>Функции f₁(ε) и f₂(ε,ψ):</Title>
                <div className="text-center text-lg">
                  <MathJax>{"$$f_1(\\varepsilon) = \\frac{1}{6} + 1{,}5 \\cdot \\varepsilon^{5} - \\frac{5}{3} \\cdot \\varepsilon^{3}$$"}</MathJax>
                </div>
                <div className="text-center text-lg mt-4">
                  <MathJax>{"$$f_2(\\varepsilon, \\psi) = \\frac{1}{8} \\cdot \\left[\\frac{335}{3} \\cdot \\varepsilon^{2} \\cdot \\psi^{3} - \\frac{225}{2} \\cdot \\varepsilon \\cdot \\psi^{4} + 27 \\cdot \\psi^{5} - \\frac{157}{6} \\cdot \\varepsilon^{5}\\right]$$"}</MathJax>
                </div>
              </Card>

              <Card className="bg-gray-50">
                <Title level={5}>Определение параметров:</Title>
                <div className="text-center text-lg">
                  <MathJax>{"$$\\varepsilon = \\left(1 + \\frac{E_m}{AC + IC}\\right)^{\\frac{1}{5}}$$"}</MathJax>
                </div>
                <div className="text-center text-lg mt-4">
                  <MathJax>{"$$\\psi = \\left(1 + \\frac{E_m \\cdot E_r}{AC \\cdot IC}\\right)^{\\frac{1}{5}}$$"}</MathJax>
                </div>
              </Card>
            </div>

            <Divider />

            <div>
              <Title level={3}>ЭКСПЕРИМЕНТАЛЬНЫЕ ДАННЫЕ</Title>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card title="Группа здоровых людей" className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    <MathJax>{"$Q_1 = 67\\%$"}</MathJax>
                  </div>
                  <div className="text-2xl font-bold text-blue-600">
                    <MathJax>{"$Q_2 = 33\\%$"}</MathJax>
                  </div>
                </Card>
                
                <Card title="Группа пациентов с заболеваниями" className="text-center">
                  <div className="text-2xl font-bold text-red-600">
                    <MathJax>{"$Q_1 = 55\\%$"}</MathJax>
                  </div>
                  <div className="text-2xl font-bold text-orange-600">
                    <MathJax>{"$Q_2 = 45\\%$"}</MathJax>
                  </div>
                </Card>
              </div>
            </div>

            <Divider />

            <div>
              <Title level={3}>ПРЕИМУЩЕСТВА ПРЕДЛАГАЕМОГО СПОСОБА</Title>
              <ol className="ml-6">
                <li><Text strong>Повышение точности</Text> определения функционального состояния миокарда левого желудочка сердца</li>
                <li><Text strong>Возможность получения более широкой информации</Text> о состоянии сердечно-сосудистой системы пациента</li>
                <li><Text strong>Неинвазивность метода</Text> - все измерения проводятся без хирургического вмешательства</li>
              </ol>
            </div>

            <Divider />

            <div>
              <Title level={3}>КЛИНИЧЕСКОЕ ЗНАЧЕНИЕ</Title>
              <Paragraph>
                <Text strong>Диагностическая ценность метода:</Text>
              </Paragraph>
              <ul className="ml-6">
                <li><Text strong>Ранняя диагностика</Text> - выявление нарушений на начальных стадиях</li>
                <li><Text strong>Мониторинг эффективности лечения</Text> - контроль динамики состояния пациента</li>
                <li><Text strong>Прогнозирование</Text> - оценка риска развития сердечно-сосудистых осложнений</li>
                <li><Text strong>Дифференциальная диагностика</Text> - различение типов сердечной патологии</li>
              </ul>
            </div>
          </Space>
        </Card>
      </div>
    </MathJaxContext>
  );
};

export default PatentPage; 