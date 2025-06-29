import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import {
    Card,
    Descriptions,
    Divider,
    Table,
    Spin,
    Alert,
    Tag,
    Typography,
    Row,
    Col
} from 'antd';
import { post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE } from '~/services/api/endpoints';

const { Title, Text } = Typography;

const StockTakeDetailPage = () => {
    const { id } = useParams();
    const model = 'StockTakeDetail';

    // Fetch stock take detail data with all related information
    const {
        isLoading,
        isError,
        data: stockTakeDetail,
        error,
    } = useQuery({
        queryKey: [`get-${model}-details`, id],
        queryFn: async () =>
            await post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
                where: {
                    id: Number(id)
                },
                include: {
                    StockTakes: true,
                    InventoryItem: {
                        include: {
                            StockValuation: true
                        }
                    }
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
                description={error?.message || 'Failed to load stock take details'}
                type="error"
                showIcon
            />
        );
    }

    if (!stockTakeDetail) {
        return <Alert message="Stock take detail not found" type="warning" showIcon />;
    }

    // Destructure with optional chaining
    const {
        system_quantity,
        physical_quantity,
        variance,
        comments,
        StockTakes,
        InventoryItem
    } = stockTakeDetail || {};

    const {
        type,
        status,
        start_date,
        end_date
    } = StockTakes || {};

    const {
        item_code,
        name,
        description,
        unit_price,
        StockValuation = []
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

    // Calculate total value based on physical quantity
    const totalValue = unit_price && physical_quantity
        ? unit_price * physical_quantity
        : null;

    // Variance status tag
    const getVarianceStatus = (variance) => {
        if (variance > 0) {
            return <Tag color="green">Over (+{variance})</Tag>;
        } else if (variance < 0) {
            return <Tag color="red">Short ({variance})</Tag>;
        }
        return <Tag color="blue">Exact (0)</Tag>;
    };

    // Stock take status tag
    const getStockTakeStatus = (status) => {
        const statusMap = {
            PLANNED: 'blue',
            IN_PROGRESS: 'orange',
            COMPLETED: 'green',
            CANCELLED: 'red'
        };
        return <Tag color={statusMap[status]}>{status}</Tag>;
    };

    // Stock take type tag
    const getStockTakeType = (type) => {
        const typeMap = {
            FULL: 'purple',
            PARTIAL: 'cyan',
            SPOT: 'gold'
        };
        return <Tag color={typeMap[type]}>{type}</Tag>;
    };

    // Valuation table columns
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
            render: formatDate,
        },
        {
            title: 'Amount',
            dataIndex: 'valuation_amount',
            key: 'valuation_amount',
            render: formatCurrency,
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Stock Take Detail</Title>

            <Card>
                {/* Stock Take Header */}
                <div style={{ marginBottom: '24px' }}>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Title level={4}>Stock Take Information</Title>
                            <Descriptions bordered column={1} size="small">
                                <Descriptions.Item label="Type">{getStockTakeType(type)}</Descriptions.Item>
                                <Descriptions.Item label="Status">{getStockTakeStatus(status)}</Descriptions.Item>
                                <Descriptions.Item label="Start Date">{formatDate(start_date)}</Descriptions.Item>
                                <Descriptions.Item label="End Date">{formatDate(end_date)}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                        <Col span={12}>
                            <Title level={4}>Inventory Item</Title>
                            <Descriptions bordered column={1} size="small">
                                <Descriptions.Item label="Item Code">{item_code}</Descriptions.Item>
                                <Descriptions.Item label="Name">{name}</Descriptions.Item>
                                <Descriptions.Item label="Description">{description || 'N/A'}</Descriptions.Item>
                                <Descriptions.Item label="Unit Price">{formatCurrency(unit_price)}</Descriptions.Item>
                            </Descriptions>
                        </Col>
                    </Row>
                </div>

                <Divider />

                {/* Quantity Comparison */}
                <Title level={4} style={{ marginBottom: '16px' }}>Quantity Comparison</Title>
                <Row gutter={16}>
                    <Col span={8}>
                        <Card title="System Quantity" bordered={false}>
                            <Title level={2} style={{ textAlign: 'center' }}>{system_quantity}</Title>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Physical Quantity" bordered={false}>
                            <Title level={2} style={{ textAlign: 'center' }}>{physical_quantity}</Title>
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title="Variance" bordered={false}>
                            <div style={{ textAlign: 'center' }}>
                                <Title level={2}>{getVarianceStatus(variance)}</Title>
                                {totalValue && (
                                    <Text type="secondary">Value: {formatCurrency(totalValue)}</Text>
                                )}
                            </div>
                        </Card>
                    </Col>
                </Row>

                <Divider />

                {/* Additional Details */}
                <Title level={4} style={{ marginBottom: '16px' }}>Additional Details</Title>
                <Descriptions bordered column={1}>
                    <Descriptions.Item label="Comments">
                        {comments || 'No comments provided'}
                    </Descriptions.Item>
                </Descriptions>

                {/* Valuation History */}
                {StockValuation?.length > 0 && (
                    <>
                        <Divider />
                        <Title level={4} style={{ marginBottom: '16px' }}>Valuation History</Title>
                        <Table
                            columns={valuationColumns}
                            dataSource={StockValuation}
                            rowKey="id"
                            pagination={{ pageSize: 5 }}
                            size="small"
                        />
                    </>
                )}
            </Card>
        </div>
    );
};

export default StockTakeDetailPage;