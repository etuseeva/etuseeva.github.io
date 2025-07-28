import React from 'react';
import { Typography, Card, Space, Divider, Row, Col, List } from 'antd';
import { MathJax } from 'better-react-mathjax';

const { Title, Text, Paragraph } = Typography;

const ArticleTab: React.FC = () => {
  return (
    <Card>
      <Title level={1}>
        ПАТЕНТ СССР № 876105
      </Title>
      
      <Title level={2} type="secondary">
        СПОСОБ ОПРЕДЕЛЕНИЯ КРОВЯНОГО ДАВЛЕНИЯ
      </Title>

      <Space direction="vertical" size="large" className="w-full">
        <div>
          <Text strong>Заявлено:</Text> 29.02.80 (21) 2884451/28-13<br />
          <Text strong>Опубликовано:</Text> 30.10.81, Бюллетень № 40<br />
          <Text strong>Дата опубликования описания:</Text> 02.11.81<br />
          <Text strong>М. Кл³:</Text> A 61 B 5/02<br />
          <Text strong>УДК:</Text> 615.475(088.8)
        </div>

        <Divider />

        <div>
          <Title level={3}>АВТОРЫ ИЗОБРЕТЕНИЯ</Title>
          <List
            dataSource={[
              'Г. М. Поединцев',
              'Г. В. Калиберди', 
              'А. Б. Береговский',
              'С. И. Пономарев',
              'И. В. Алферова',
              'О. К. Струмскина'
            ]}
            renderItem={item => <List.Item>• {item}</List.Item>}
          />
        </div>

        <Divider />

        <div>
          <Title level={3}>ОПИСАНИЕ ИЗОБРЕТЕНИЯ</Title>
          
          <Title level={4}>ОБЛАСТЬ ПРИМЕНЕНИЯ</Title>
          <Paragraph>
            Изобретение относится к медицине, точнее кардиологии и может быть использовано 
            для диагностики различных заболеваний сердечно-сосудистой системы и ее 
            функционального состояния в новых областях медицинской практики.
          </Paragraph>

          <Title level={4}>ПРОБЛЕМА СУЩЕСТВУЮЩИХ МЕТОДОВ</Title>
          <Paragraph>
            Наиболее близким к предлагаемому по технической сущности и достигаемому результату 
            является способ определения кровяного давления в восходящей аорте путем измерения 
            длительности фаз изометрического сокращения левого желудочка сердца.
          </Paragraph>
          <Paragraph>
            <Text strong>Недостатки известного способа:</Text>
          </Paragraph>
          <List
            dataSource={[
              'Не учитываются важные фазовые процессы сердечного цикла',
              'Недостаточно учитывается скорость процесса сокращения левого желудочка',
              'Не принимается во внимание скорость быстрого изгнания крови из левого желудочка',
              'Низкая точность определения величины кровяного давления в аорте'
            ]}
            renderItem={item => <List.Item>• {item}</List.Item>}
          />

          <Title level={4}>ЦЕЛЬ ИЗОБРЕТЕНИЯ</Title>
          <Paragraph>
            <Text strong>Повышение точности способа определения кровяного давления в восходящей аорте.</Text>
          </Paragraph>

          <Title level={4}>СУТЬ ПРЕДЛАГАЕМОГО МЕТОДА</Title>
          <Paragraph>
            Способ определения кровяного давления в восходящей аорте путем измерения длительности 
            фаз изометрического сокращения левого желудочка сердца, дополнительно включает:
          </Paragraph>
          <List
            dataSource={[
              { title: 'Измерение длительности фазы асинхронного сокращения левого желудочка (AC)', description: 'начальная фаза сокращения миокарда' },
              { title: 'Измерение длительности фазы быстрого изгнания крови (Em)', description: 'основной выброс крови из желудочка' },
              { title: 'Определение длительности фазы систолического сокращения', description: 'полный цикл сокращения' },
              { title: 'Определение скорости быстрого изгнания крови', description: 'динамические характеристики выброса' }
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
            <Title level={5}>Диастолическое давление в восходящей аорте:</Title>
            <div className="text-center">
              <MathJax>{"$$P_d = F_1(\\rho, AC, IC, E_m)$$"}</MathJax>
            </div>
            <Paragraph type="secondary" className="text-center mt-2">
              где P<sub>d</sub> - диастолическое давление в восходящей аорте;<br />
              F<sub>1</sub> - функция, отображающая зависимость величины P<sub>d</sub> от длительности фаз сердечного цикла;<br />
              ρ - плотность крови;<br />
              AC - длительность фазы асинхронного сокращения;<br />
              IC - длительность фазы изометрического сокращения;<br />
              E<sub>m</sub> - длительность фазы быстрого изгнания.
            </Paragraph>
          </Card>

          <Card className="bg-gray-50">
            <Title level={5}>Систолическое давление в восходящей аорте:</Title>
            <div className="text-center">
              <MathJax>{"$$P_s = F_2(P_d) = \\frac{5}{3}P_d$$"}</MathJax>
            </div>
            <Paragraph type="secondary" className="text-center mt-2">
              где P<sub>s</sub> - систолическое давление в восходящей аорте;<br />
              F<sub>2</sub> - функция, отображающая зависимость величины P<sub>s</sub> от диастолического давления.
            </Paragraph>
          </Card>

          <Card className="bg-gray-50">
            <Title level={5}>Пульсовое давление:</Title>
            <div className="text-center">
              <MathJax>{"$$\\Delta P = P_s - P_d$$"}</MathJax>
            </div>
          </Card>

          <Card className="bg-gray-50">
            <Title level={5}>Безразмерный параметр d₁:</Title>
            <div className="text-center">
              <MathJax>{"$$d_1 = \\left(1 + \\frac{E_m}{AC + IC}\\right)^{0.2}$$"}</MathJax>
            </div>
          </Card>

          <Card className="bg-gray-50">
            <Title level={5}>Функция F(d,g):</Title>
            <div className="text-center">
              <MathJax>{"$$F(d,g) = \\frac{22.5 \\cdot g \\cdot [(5d - 2)^3 - 27]}{(5d - 2)^5 - 243}$$"}</MathJax>
            </div>
            <Paragraph type="secondary" className="text-center mt-2">
              где g - ускорение силы тяжести (9.8 м/с²)
            </Paragraph>
          </Card>

          <Card className="bg-gray-50">
            <Title level={5}>Диастолическое давление (детализированная формула):</Title>
            <div className="text-center">
              <MathJax>{"$$P_d = F_1 = 0.6\\rho \\cdot t_1 \\cdot f^2(d,g) \\cdot (AC + IC)$$"}</MathJax>
            </div>
            <Paragraph type="secondary" className="text-center mt-2">
              где t<sub>1</sub> = 1 с (время единичного цикла)
            </Paragraph>
          </Card>
        </div>

        <Divider />

        <div>
          <Title level={3}>ПРИМЕР РАСЧЕТА</Title>
          
          <Title level={4}>Исходные данные:</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} md={12}>
              <Card size="small" title="Временные параметры">
                <div>AC = 0.075 с (75 мс)</div>
                <div>IC = 0.057 с (57 мс)</div>
                <div>E<sub>m</sub> = 0.130 с (130 мс)</div>
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Card size="small" title="Физические параметры">
                <div>ρ = 1060 кг/м³ (плотность крови)</div>
                <div>g = 9.8 м/с² (ускорение силы тяжести)</div>
              </Card>
            </Col>
          </Row>

          <Title level={4}>Пошаговый расчет:</Title>

          <Card size="small" title="Шаг 1: Расчет параметра d₁">
            <div className="bg-gray-50 p-3 rounded">
              <MathJax>{"$$d_1 = \\left(1 + \\frac{0.130}{0.075 + 0.057}\\right)^{0.2} = \\left(1 + \\frac{0.130}{0.132}\\right)^{0.2}$$"}</MathJax>
              <MathJax>{"$$d_1 = (1 + 0.9848)^{0.2} = (1.9848)^{0.2} = 1.147$$"}</MathJax>
            </div>
          </Card>

          <Card size="small" title="Шаг 2: Расчет функции F(d,g)">
            <div className="bg-gray-50 p-3 rounded">
              <MathJax>{"$$F(d,g) = \\frac{22.5 \\times 9.8 \\times [(5 \\times 1.147 - 2)^3 - 27]}{(5 \\times 1.147 - 2)^5 - 243}$$"}</MathJax>
              <MathJax>{"$$F(d,g) = \\frac{22.5 \\times 9.8 \\times [3.735^3 - 27]}{3.735^5 - 243} = 1.145 \\times 10^{3} \\text{ см/с}^2$$"}</MathJax>
            </div>
          </Card>

          <Card size="small" title="Шаг 3: Результаты расчета">
            <Row gutter={[16, 16]}>
              <Col span={8}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-500">85</div>
                  <div className="text-sm text-gray-500">P<sub>d</sub> (мм рт.ст.)</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-red-500">141.7</div>
                  <div className="text-sm text-gray-500">P<sub>s</sub> (мм рт.ст.)</div>
                </div>
              </Col>
              <Col span={8}>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-500">56.7</div>
                  <div className="text-sm text-gray-500">ΔP (мм рт.ст.)</div>
                </div>
              </Col>
            </Row>
          </Card>
        </div>

        <Divider />

        <div>
          <Title level={3}>ПРЕИМУЩЕСТВА ПРЕДЛАГАЕМОГО СПОСОБА</Title>
          <List
            dataSource={[
              { title: 'Повышение точности', description: 'определения кровяного давления в восходящей аорте' },
              { title: 'Неинвазивность метода', description: 'получение точной информации бескровным путем' },
              { title: 'Простота осуществления', description: 'метод прост в реализации и безвреден' },
              { title: 'Комфорт для пациента', description: 'не вызывает болезненных ощущений у обследуемого' },
              { title: 'Универсальность применения', description: 'возможность использования как в стационаре, так и в поликлинике' },
              { title: 'Многократность исследований', description: 'возможность регистрации в течение многих часов' }
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
            <Text strong>Области применения метода:</Text>
          </Paragraph>
          <List
            dataSource={[
              { title: 'Диагностика сердечно-сосудистых заболеваний', description: 'определение функционального состояния системы кровообращения' },
              { title: 'Дополнительный диагностический тест', description: 'использование в комплексе с другими методами обследования' },
              { title: 'Мониторинг состояния', description: 'контроль динамики изменений в норме и патологии' },
              { title: 'Раннее выявление нарушений', description: 'обнаружение отклонений на начальных стадиях' }
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
          <Title level={3}>ИСТОЧНИКИ ИНФОРМАЦИИ</Title>
          <Paragraph>
            1. Савицкий Н. Н. Биофизические основы кровообращения и клинические методы изучения гемодинамики. 
            Л, "Медицина" 1974, с. 121-158.
          </Paragraph>
        </div>

        <div className="mt-8 p-4 bg-gray-50 rounded">
          <Text type="secondary">
            <Text strong>Составитель:</Text> В. Матвеева<br />
            <Text strong>Редактор:</Text> П. Макаревич<br />
            <Text strong>Техред:</Text> А. Ач<br />
            <Text strong>Корректор:</Text> М. Шароши<br />
            <Text strong>ВНИИПИ Государственного комитета СССР по делам изобретений и открытий</Text><br />
            113035, Москва, Ж-35, Раушская наб., д. 4/5<br />
            <Text strong>Филиал ППП "Патент", г. Ужгород, ул. Проектная, 4</Text>
          </Text>
        </div>
      </Space>
    </Card>
  );
};

export default ArticleTab; 