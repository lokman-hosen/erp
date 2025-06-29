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
  Spin
} from 'antd';
import { ArrowRightOutlined } from '@ant-design/icons';
import { post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE } from '~/services/api/endpoints';


const { Title, Text } = Typography;

const InventoryMovementDetails = () => {
  const { id } = useParams();
  const model = 'InventoryMovement';

  // Fetch inventory movement data with all related information
  const {
    isLoading,
    isError,
    data: movement,
    error,
  } = useQuery({
    queryKey: [`get-${model}-details`, id],
    queryFn: async () =>
      await post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
        where: {
          id: Number(id)
        },
        include: {
          InventoryItem: true,
          FromLocation: true,
          ToLocation: true
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
        description={error?.message || 'Failed to load inventory movement details'}
        type="error"
        showIcon
      />
    );
  }

  if (!movement) {
    return <Alert message="Inventory movement not found" type="warning" showIcon />;
  }

  // Destructure with optional chaining
  const {
    quantity,
    movement_date,
    movement_type,
    InventoryItem,
    FromLocation,
    ToLocation
  } = movement || {};

  const {
    item_code,
    name,
    description,
    unit_price
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

  // Calculate total value
  const totalValue = unit_price && quantity 
    ? unit_price * quantity 
    : null;

  // Movement type tag
  const getMovementTypeTag = (type) => {
    const typeMap = {
      TRANSFER: 'blue',
      RECEIPT: 'green',
      ISSUE: 'orange',
      ADJUSTMENT: 'purple',
      RETURN: 'cyan'
    };
    return <Tag color={typeMap[type]}>{type}</Tag>;
  };

  // Location status tag
  const getLocationStatusTag = (status) => {
    const statusMap = {
      ACTIVE: 'green',
      INACTIVE: 'red',
      MAINTENANCE: 'orange'
    };
    return <Tag color={statusMap[status]}>{status}</Tag>;
  };

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Inventory Movement Details</Title>
      
      <Card>
        {/* Movement Header */}
        <div style={{ marginBottom: '24px' }}>
          <Row gutter={16}>
            <Col span={24}>
              <Title level={4}>Movement Information</Title>
              <Descriptions bordered column={2} size="small">
                <Descriptions.Item label="Movement Type">
                  {getMovementTypeTag(movement_type)}
                </Descriptions.Item>
                <Descriptions.Item label="Movement Date">
                  {formatDate(movement_date)}
                </Descriptions.Item>
                <Descriptions.Item label="Quantity">
                  <Text strong>{quantity}</Text>
                </Descriptions.Item>
                {totalValue && (
                  <Descriptions.Item label="Total Value">
                    <Text strong>{formatCurrency(totalValue)}</Text>
                  </Descriptions.Item>
                )}
              </Descriptions>
            </Col>
          </Row>
        </div>

        <Divider />

        {/* Location Transfer Visualization */}
        <Title level={4} style={{ marginBottom: '24px', textAlign: 'center' }}>Stock Transfer</Title>
        <Row gutter={16} justify="center" align="middle">
          <Col span={8}>
            <Card title="From Location" bordered={false}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Name">
                  <Text strong>{FromLocation?.name || 'N/A'}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                  <Tag>{FromLocation?.type || 'N/A'}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {FromLocation?.status ? getLocationStatusTag(FromLocation.status) : 'N/A'}
                </Descriptions.Item>
              </Descriptions>
            </Card>
          </Col>
          <Col span={2} style={{ textAlign: 'center' }}>
            <ArrowRightOutlined style={{ fontSize: '24px', color: '#1890ff' }} />
          </Col>
          <Col span={8}>
            <Card title="To Location" bordered={false}>
              <Descriptions column={1} size="small">
                <Descriptions.Item label="Name">
                  <Text strong>{ToLocation?.name || 'N/A'}</Text>
                </Descriptions.Item>
                <Descriptions.Item label="Type">
                  <Tag>{ToLocation?.type || 'N/A'}</Tag>
                </Descriptions.Item>
                <Descriptions.Item label="Status">
                  {ToLocation?.status ? getLocationStatusTag(ToLocation.status) : 'N/A'}
                </Descriptions.Item>
              </Descriptions>
            </Card>
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
              <Descriptions.Item label="Quantity Moved">
                <Statistic value={quantity} />
              </Descriptions.Item>
              {totalValue && (
                <Descriptions.Item label="Total Value">
                  <Statistic value={formatCurrency(totalValue)} />
                </Descriptions.Item>
              )}
            </Descriptions>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default InventoryMovementDetails;