import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  Descriptions, 
  Image, 
  Tag, 
  Typography, 
  Spin, 
  Space,
  Divider,
  Row,
  Col,
  Empty
} from 'antd';
import { CheckCircleOutlined } from '@ant-design/icons';
import { post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE } from '~/services/api/endpoints';

const { Title, Text, Paragraph } = Typography;

const UserDetailsPage = () => {
  const { id } = useParams();
  const model = 'User'; // Your model name

  const {
    isLoading,
    isError,
    data: user,
    refetch,
  } = useQuery({
    queryKey: [`get-${model}-details`],
    queryFn: async () =>
      await post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
        where: {
          id: Number(id)
        }
      }),
    select(data) {
      return data?.data[0] ?? null;
    },
    refetchOnWindowFocus: false,
  });

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !user) {
    return (
      <Card>
        <Empty description="Failed to load user data" />
      </Card>
    );
  }

  // Destructure with optional chaining
  const {
    name,
    email,
    phone,
    status,
    profile_image,
    private_notes,
    is_verified,
    address,
    description
  } = user || {};

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Row gutter={[24, 24]}>
          {/* User Profile Image */}
          <Col xs={24} md={8}>
            <Space direction="vertical" align="center" style={{ width: '100%' }}>
              <Image
                src={profile_image}
                alt={name}
                style={{ 
                  width: 200, 
                  height: 200, 
                  borderRadius: '50%',
                  objectFit: 'cover'
                }}
                fallback="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
              />
              <Title level={3} style={{ marginTop: 16 }}>
                {name || 'No Name'}
              </Title>
              {is_verified && (
                <Tag color="green" icon={<CheckCircleOutlined />}>
                  Verified
                </Tag>
              )}
            </Space>
          </Col>

          {/* User Details */}
          <Col xs={24} md={16}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Descriptions bordered column={1}>
                <Descriptions.Item label="Email">
                  <Text copyable>{email || 'N/A'}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Phone">
                  <Text copyable>{phone || 'N/A'}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  <Tag color={status === 'active' ? 'green' : status === 'inactive' ? 'red' : 'default'}>
                    {status?.toUpperCase() || 'UNKNOWN'}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Address">
                  {address || 'N/A'}
                </Descriptions.Item>
              </Descriptions>

              {description && (
                <>
                  <Divider />
                  <Title level={5}>About</Title>
                  <Paragraph>{description}</Paragraph>
                </>
              )}

              {private_notes && (
                <>
                  <Divider />
                  <Title level={5}>Private Notes</Title>
                  <Paragraph type="secondary">{private_notes}</Paragraph>
                </>
              )}
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default UserDetailsPage;