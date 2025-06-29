import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
  Card,
  Descriptions,
  Tag,
  Typography,
  Spin,
  Space,
  Divider,
  Row,
  Col,
  Tabs,
  Table,
  Empty,
  Button
} from 'antd';
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  ReloadOutlined
} from '@ant-design/icons';
import { post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE } from '~/services/api/endpoints';


const { Title, Text, Paragraph } = Typography;
const { TabPane } = Tabs;

const SupplierDetailsPage = () => {
  const { id } = useParams();
  const model = 'Supplier';

  // Fetch supplier data
  const {
    isLoading,
    isError,
    data: supplier,
    refetch,
  } = useQuery({
    queryKey: [`get-${model}-details`, id],
    queryFn: async () =>
      await post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
        where: {
          id: Number(id)
        },
        include: {
          GoodsReturn: true
        }
      }),
    select(data) {
      return data?.data[0] ?? null;
    },
    refetchOnWindowFocus: false,
  });


  console.log("supplier data", supplier)

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" />
      </div>
    );
  }

  if (isError || !supplier) {
    return (
      <Card>
        <Empty description="Failed to load supplier data" />
      </Card>
    );
  }

  // Destructure with optional chaining
  const {
    name,
    contact_person,
    phone,
    email,
    address,
    status,
    created_at,
    updated_at,
    GoodsReturn
  } = supplier || {};

  // Columns for goods returns table
  const goodsReturnColumns = [
    {
      title: 'GRN Number',
      dataIndex: "good_receipt_id",
      render: (record)=><>{record}</>,
    },
    {
      title: 'Return Date',
      dataIndex: 'return_date',
      key: 'return_date',
      render: (date) => new Date(date).toLocaleDateString(),
    },

    {
      title: 'Reason',
      dataIndex: 'reason',
      key: 'reason',
      ellipsis: true,
    },
    {
      title: 'Status',
      dataIndex: ['GoodReceipt', 'status'],
      key: 'status',
      render: (status) => (
        <Tag color={status === 'completed' ? 'green' : 'orange'}>
          {status?.toUpperCase()}
        </Tag>
      ),
    },
  ];

  return (
    <div style={{ padding: '24px' }}>
      <Card
        title={
          <Space>
            <Title level={4} style={{ margin: 0 }}>Supplier Details</Title>
            <Button
              icon={<ReloadOutlined />}
              onClick={() => refetch()}
              size="small"
            />
          </Space>
        }
      >
        <Row gutter={[24, 24]}>
          <Col span={24}>
            <Descriptions bordered column={{ xs: 1, sm: 2 }}>
              <Descriptions.Item label="Supplier Name">
                <Text strong>{name}</Text>
              </Descriptions.Item>
              <Descriptions.Item label="Status">
                <Tag color={status === 'active' ? 'green' : 'red'}>
                  {status?.toUpperCase()}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="Contact Person">
                {contact_person}
              </Descriptions.Item>
              <Descriptions.Item label="Phone">
                <Space>
                  <PhoneOutlined />
                  <Text copyable>{phone}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Email">
                <Space>
                  <MailOutlined />
                  <Text copyable>{email}</Text>
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Address">
                <Space>
                  <EnvironmentOutlined />
                  {address}
                </Space>
              </Descriptions.Item>
              <Descriptions.Item label="Created At">
                {new Date(created_at).toLocaleString()}
              </Descriptions.Item>
              <Descriptions.Item label="Updated At">
                {new Date(updated_at).toLocaleString()}
              </Descriptions.Item>
            </Descriptions>
          </Col>

          <Col span={24}>
            <Tabs defaultActiveKey="goodsReturns">
              <TabPane tab="Goods Returns" key="goodsReturns">
                <Table
                  columns={goodsReturnColumns}
                  dataSource={supplier?.GoodsReturn || GoodsReturn || []}
                  rowKey="id"
                  pagination={{ pageSize: 5 }}
                  locale={{
                    emptyText: <Empty description="No goods returns found" />
                  }}
                />
              </TabPane>
            </Tabs>
          </Col>
        </Row>
      </Card>
    </div>
  );
};

export default SupplierDetailsPage;