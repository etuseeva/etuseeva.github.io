import React from 'react';
import { Typography } from 'antd';

const { Title } = Typography;

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0 w-full h-full p-8">
        <Title level={1} className="mb-8">
          Posts
        </Title>
        {children}
    </div>
  );
};

export default MainLayout; 