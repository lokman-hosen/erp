import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  Descriptions, 
  Tabs, 
  Table, 
  Spin, 
  Alert,
  Tag,
  Typography 
} from 'antd';
import { post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE } from '~/services/api/endpoints';


const { Title, Text } = Typography;
const { TabPane } = Tabs;

const InventoryItemDetails = () => {
  const { id } = useParams();
  const model = 'InventoryItem';

  // Fetch inventory item data with all related information
  const {
    isLoading,
    isError,
    data: inventoryItem,
    error,
  } = useQuery({
    queryKey: [`get-${model}-details`, id],
    queryFn: async () =>
      await post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
        where: {
          id: Number(id)
        },
        include: {
          InventoryMovement: {
            include: {
              FromLocation: true,
              ToLocation: true
            }
          },
          ApprovedPriceList: true,
          StockValuation: true,
          Disposal: true,
          InventoryUpdate: true,
          StockTakeDetail: true
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
        description={error?.message || 'Failed to load inventory item details'}
        type="error"
        showIcon
      />
    );
  }

  if (!inventoryItem) {
    return <Alert message="Inventory item not found" type="warning" showIcon />;
  }

  // Destructure with optional chaining
  const {
    item_code,
    name,
    description,
    unit_price,
    min_stock_quantity,
    max_stock_quantity,
    reorder_stock_quantity,
    safety_stock_level,
    expiry_date,
    last_stock_date,
    cycle_count_code,
    attributes,
    InventoryMovement = [],
    ApprovedPriceList = [],
    StockValuation = [],
    Disposal = [],
    InventoryUpdate = [],
    StockTakeDetail = []
  } = inventoryItem || {};

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString();
  };

  // Table columns for related data
  const movementColumns = [
    {
      title: 'Movement Date',
      dataIndex: 'movement_date',
      key: 'movement_date',
      render: (date) => formatDate(date),
    },
    {
      title: 'Type',
      dataIndex: 'movement_type',
      key: 'movement_type',
    },
    {
      title: 'From Location',
      dataIndex: ['FromLocation', 'name'],
      key: 'from_location',
    },
    {
      title: 'To Location',
      dataIndex: ['ToLocation', 'name'],
      key: 'to_location',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
  ];

  const priceListColumns = [
    {
      title: 'Effective Date',
      dataIndex: 'effective_date',
      key: 'effective_date',
      render: (date) => formatDate(date),
    },
    {
      title: 'Supplier ID',
      dataIndex: 'supplier_id',
      key: 'supplier_id',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (value) => `$${value.toFixed(2)}`,
    },
  ];

  const valuationColumns = [
    {
      title: 'Valuation Method',
      dataIndex: 'valuation_method',
      key: 'valuation_method',
    },
    {
      title: 'Last Valuation Date',
      dataIndex: 'last_valuation_date',
      key: 'last_valuation_date',
      render: (date) => formatDate(date),
    },
    {
      title: 'Amount',
      dataIndex: 'valuation_amount',
      key: 'valuation_amount',
      render: (value) => `$${value.toFixed(2)}`,
    },
  ];

  const disposalColumns = [
    {
      title: 'Disposal Date',
      dataIndex: 'disposal_date',
      key: 'disposal_date',
      render: (date) => formatDate(date),
    },
    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
    },
    {
      title: 'Status',
      dataIndex: 'approval_status',
      key: 'approval_status',
      render: (status) => <Tag color={status === 'APPROVED' ? 'green' : 'orange'}>{status}</Tag>,
    },
    {
      title: 'Disposal Code',
      dataIndex: 'disposal_code',
      key: 'disposal_code',
    },
  ];

  const updateColumns = [
    {
      title: 'Update Date',
      dataIndex: 'update_date',
      key: 'update_date',
      render: (date) => formatDate(date),
    },
    {
      title: 'Type',
      dataIndex: 'update_type',
      key: 'update_type',
    },
    {
      title: 'Quantity Change',
      dataIndex: 'change_quantity',
      key: 'change_quantity',
    },
    {
      title: 'Updated By',
      dataIndex: 'updated_by',
      key: 'updated_by',
    },
  ];

  const stockTakeColumns = [
    {
      title: 'System Quantity',
      dataIndex: 'system_quantity',
      key: 'system_quantity',
    },
    {
      title: 'Physical Quantity',
      dataIndex: 'physical_quantity',
      key: 'physical_quantity',
    },
    {
      title: 'Variance',
      dataIndex: 'variance',
      key: 'variance',
      render: (value) => (
        <Text type={value < 0 ? 'danger' : value > 0 ? 'success' : undefined}>
          {value}
        </Text>
      ),
    },
    {
      title: 'Comments',
      dataIndex: 'comments',
      key: 'comments',
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2}>Inventory Item Details</Title>
      
      <Card>
        <Descriptions 
          title={<Title level={4}>{name} ({item_code})</Title>} 
          bordered 
          column={{ xs: 1, sm: 2, md: 3 }}
        >
          <Descriptions.Item label="Description">{description || 'N/A'}</Descriptions.Item>
          <Descriptions.Item label="Unit Price">${unit_price?.toFixed(2)}</Descriptions.Item>
          <Descriptions.Item label="Min Stock Quantity">{min_stock_quantity}</Descriptions.Item>
          <Descriptions.Item label="Max Stock Quantity">{max_stock_quantity}</Descriptions.Item>
          <Descriptions.Item label="Reorder Quantity">{reorder_stock_quantity}</Descriptions.Item>
          <Descriptions.Item label="Safety Stock Level">{safety_stock_level}</Descriptions.Item>
          <Descriptions.Item label="Expiry Date">{formatDate(expiry_date)}</Descriptions.Item>
          <Descriptions.Item label="Last Stock Date">{formatDate(last_stock_date)}</Descriptions.Item>
          <Descriptions.Item label="Cycle Count Code">{cycle_count_code || 'N/A'}</Descriptions.Item>
        </Descriptions>

        <Tabs defaultActiveKey="1" style={{ marginTop: '24px' }}>
          <TabPane tab="Movements" key="1">
            <Table 
              columns={movementColumns} 
              dataSource={InventoryMovement} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          <TabPane tab="Price Lists" key="2">
            <Table 
              columns={priceListColumns} 
              dataSource={ApprovedPriceList} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          <TabPane tab="Valuations" key="3">
            <Table 
              columns={valuationColumns} 
              dataSource={StockValuation} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          <TabPane tab="Disposals" key="4">
            <Table 
              columns={disposalColumns} 
              dataSource={Disposal} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          <TabPane tab="Updates" key="5">
            <Table 
              columns={updateColumns} 
              dataSource={InventoryUpdate} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
          <TabPane tab="Stock Takes" key="6">
            <Table 
              columns={stockTakeColumns} 
              dataSource={StockTakeDetail} 
              rowKey="id"
              pagination={{ pageSize: 5 }}
            />
          </TabPane>
        </Tabs>
      </Card>
    </div>
  );
};

export default InventoryItemDetails;