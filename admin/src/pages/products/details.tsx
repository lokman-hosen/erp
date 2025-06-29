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
  Col
} from 'antd';
import { get, post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE, getUrlForModel } from '~/services/api/endpoints';
const model = 'Product'
const { Title, Text, Paragraph } = Typography;

const ProductDetailsPage = () => {
  const { id } = useParams();

  const {
    isLoading,
    isError,
    data: product,
    refetch,
  } = useQuery({
    queryKey: [`get-${model}-price-list`],
    queryFn: async () =>
      await post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
        where: {
          id: Number(id)
        },
        refetchOnWindowFocus: false,
      }),
    select(data) {
      return data?.data[0] ?? [];
    },
  });

  console.log("product>>>", product)

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !product) {
    return <div>Error loading product details</div>;
  }

  // Destructure with optional chaining
  const {
    name,
    description,
    price,
    stock_quantity,
    stock_status,
    sku,
    barcode,
    weight,
    featured_image,
    is_featured,
    status,
    label,
    collection_tag
  } = product || {};

  return (
    <div style={{ padding: '24px' }}>
      <Card>
        <Row gutter={[24, 24]}>
          {/* Product Image */}
          <Col xs={24} md={8}>
            <Image
              src={featured_image}
              alt={name}
              style={{ width: '100%', borderRadius: '8px' }}
              fallback="https://developers.elementor.com/docs/assets/img/elementor-placeholder-image.png"
            />
          </Col>

          {/* Product Details */}
          <Col xs={24} md={16}>
            <Space direction="vertical" size="middle" style={{ width: '100%' }}>
              <Title level={2}>{name}</Title>

              {label && <Tag color="blue">{label}</Tag>}
              {is_featured && <Tag color="gold">Featured</Tag>}
              {collection_tag && <Tag>{collection_tag}</Tag>}
              {status && <Tag color={status === 'active' ? 'green' : 'red'}>{status}</Tag>}

              <Title level={4} style={{ marginTop: '16px' }}>
                ${price?.toFixed(2)}
              </Title>

              <Descriptions bordered column={1}>
                <Descriptions.Item label="Stock Quantity">{stock_quantity}</Descriptions.Item>
                <Descriptions.Item label="Stock Status">
                  <Tag color={stock_status === 'in_stock' ? 'green' : 'red'}>
                    {stock_status?.replace('_', ' ')}
                  </Tag>
                </Descriptions.Item>
                <Descriptions.Item label="SKU">{sku || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Barcode">{barcode || 'N/A'}</Descriptions.Item>
                <Descriptions.Item label="Weight">{weight ? `${weight} kg` : 'N/A'}</Descriptions.Item>
              </Descriptions>

              <Divider />

              <Title level={4}>Description</Title>
              <Paragraph>
                {description || 'No description available'}
              </Paragraph>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default ProductDetailsPage;