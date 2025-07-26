import React from 'react';
import { Card, Tag, Typography } from 'antd';

const { Title, Text } = Typography;

interface PostCardProps {
  title: string;
  description: string;
}

const PostCard: React.FC<PostCardProps> = ({ 
  title, 
  description, 
}) => {
  return (
    <Card title={title}>
          <Text type="secondary">
            {description}
          </Text>
    </Card>
  );
};

export default PostCard; 