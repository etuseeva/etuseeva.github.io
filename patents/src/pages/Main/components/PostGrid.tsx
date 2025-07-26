import React from 'react';
import { Row, Col, Typography } from 'antd';
import PostCard from './PostCard';

const { Title } = Typography;

interface Post {
  id: string;
  title: string;
  description: string;
}

interface PostGridProps {
  posts: Post[];
  categoryTitle?: string;
}

const PostGrid: React.FC<PostGridProps> = ({ posts, categoryTitle }) => {
  return (
    <div className="mb-8">
      {categoryTitle && (
        <Title level={3} type="secondary" className="mb-4">
          {categoryTitle}
        </Title>
      )}
      <Row gutter={[24, 24]}>
        {posts.map((post) => (
          <Col 
            key={post.id}
            xs={24} 
            sm={12} 
            lg={8}
          >
            <PostCard
              title={post.title}
              description={post.description}
            />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default PostGrid; 