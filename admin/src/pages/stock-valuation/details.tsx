import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  Descriptions,
  Divider,
  Tag,
  Typography,
  Row,
  Col,
  Statistic,
  Alert,
  Spin,
  Space
} from 'antd';
import { post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE } from '~/services/api/endpoints';


const { Title, Text } = Typography;

const StockValuationDetails = () => {
  const { id } = useParams();
  const model = 'StockValuation';

  // Fetch stock valuation data with all related information
  const {
    isLoading,
    isError,
    data: valuation,
    error,
  } = useQuery({
    queryKey: [`get-${model}-details`, id],
    queryFn: async () =>
      await post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
        where: {
          id: Number(id)
        },
        include: {
          InventoryItem: true
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

  if (isError) {
    return (
      <Alert
        message="Error"
        description={error?.message || 'Failed to load stock valuation details'}
        type="error"
        showIcon
      />
    );
  }

  if (!valuation) {
    return <Alert message="Stock valuation not found" type="warning" showIcon />;
  }

  // Destructure with optional chaining
  const {
    valuation_method,
    last_valuation_date,
    valuation_amount,
    InventoryItem
  } = valuation || {};

  const {
    item_code,
    name,
    description,
    unit_price,
    min_stock_quantity,
    max_stock_quantity,
    reorder_stock_quantity,
    safety_stock_level
  } = InventoryItem || {};

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleString();
  };

  // Format currency
  const formatCurrency = (value) => {
    if (value === undefined || value === null) return 'N/A';
    return `$${value.toFixed(2)}`;
  };

  // Valuation method tag
  const getValuationMethodTag = (method) => {
    const methodMap = {
      FIFO: 'blue',
      LIFO: 'purple',
      WEIGHTED_AVERAGE: 'green',
      STANDARD_COST: 'orange',
      SPECIFIC_IDENTIFICATION: 'cyan'
    };
    return <Tag color={methodMap[method]}>{method.replace(/_/g, ' ')}</Tag>;
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Stock Valuation Details</Title>

      <Card>
        {/* Valuation Header */}
        <Row gutter={16}>
          <Col span={24}>
            <Title level={4} style={{ marginBottom: '16px' }}>Valuation Information</Title>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Valuation Method" span={2}>
                {getValuationMethodTag(valuation_method)}
              </Descriptions.Item>
              <Descriptions.Item label="Last Valuation Date">
                {formatDate(last_valuation_date)}
              </Descriptions.Item>
              <Descriptions.Item label="Valuation Amount">
                <Text strong>{formatCurrency(valuation_amount)}</Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Divider />

        {/* Inventory Item Details */}
        <Title level={4} style={{ marginBottom: '16px' }}>Inventory Item</Title>
        <Row gutter={16}>
          <Col span={24}>
            <Descriptions bordered column={2} size="small">
              <Descriptions.Item label="Item Code">{item_code}</Descriptions.Item>
              <Descriptions.Item label="Name">{name}</Descriptions.Item>
              <Descriptions.Item label="Description" span={2}>
                {description || 'N/A'}
              </Descriptions.Item>
              <Descriptions.Item label="Unit Price">
                {formatCurrency(unit_price)}
              </Descriptions.Item>
              <Descriptions.Item label="Current Valuation">
                <Text strong>{formatCurrency(valuation_amount)}</Text>
              </Descriptions.Item>
            </Descriptions>
          </Col>
        </Row>

        <Divider />

        {/* Stock Levels */}
        <Title level={4} style={{ marginBottom: '16px' }}>Stock Levels</Title>
        <Row gutter={16}>
          <Col span={6}>
            <Card size="small" title="Minimum Stock">
              <Statistic value={min_stock_quantity} />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="Maximum Stock">
              <Statistic value={max_stock_quantity} />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="Reorder Point">
              <Statistic value={reorder_stock_quantity} />
            </Card>
          </Col>
          <Col span={6}>
            <Card size="small" title="Safety Stock">
              <Statistic value={safety_stock_level} />
            </Card>
          </Col>
        </Row>

        <Divider />

        {/* Valuation Summary */}
        <Title level={4} style={{ marginBottom: '16px' }}>Valuation Summary</Title>
        <Row gutter={16} justify="space-around">
          <Col>
            <Space direction="vertical" align="center">
              <Text type="secondary">Unit Price</Text>
              <Title level={3}>{formatCurrency(unit_price)}</Title>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" align="center">
              <Text type="secondary">Valuation Method</Text>
              <Title level={3}>{getValuationMethodTag(valuation_method)}</Title>
            </Space>
          </Col>
          <Col>
            <Space direction="vertical" align="center">
              <Text type="secondary">Valuation Amount</Text>
              <Title level={3} type="success">{formatCurrency(valuation_amount)}</Title>
            </Space>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default StockValuationDetails;