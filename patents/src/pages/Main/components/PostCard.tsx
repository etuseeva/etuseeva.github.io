import React from 'react';
import { Card, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';

const { Text } = Typography;

interface PostCardProps {
  title: string;
  description: string;
  onClick?: () => void;
}

const PostCard: React.FC<PostCardProps> = ({ 
  title, 
  description,
  onClick
}) => {
  return (
    <Card 
      title={title}
      hoverable
      onClick={onClick}
      className="cursor-pointer transition-all duration-200 hover:shadow-lg"
    >
      <Text type="secondary">
        {description}
      </Text>
    </Card>
  );
};

export default PostCard; 