import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 bg-gray-100">
      <div className="w-full h-full overflow-y-auto p-3">
      <Title level={1} className="mb-8">
        Архив Патентов СССР
      </Title>
      {children}
      </div>
    </div>
  );
};

export default MainLayout; 