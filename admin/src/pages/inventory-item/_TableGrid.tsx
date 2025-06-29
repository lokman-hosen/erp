/* eslint-disable */

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteApi, get } from "~/services/api/api";
import { getUrlForModel } from "~/services/api/endpoints";

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
    const KEY = `all-${model}`;

    const {
        isLoading,
        isError,
        error,
        data: fetchData,
        refetch,
    } = useQuery({
        queryKey: [KEY],
        queryFn: () => get(getUrlForModel(model)),
        staleTime: 0,
    });

    useEffect(() => {
        if (trigger) {
            refetch();
        }
    }, [trigger]);


    const deleteMutation = useMutation({
        mutationFn: async (id: any) => await deleteApi(getUrlForModel(model, id)),
        onSuccess: () => {
            message.success('Deleted Successfully');
            refetch()
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const handleDeleteClient = (id: any) => {
        deleteMutation.mutate(id);
    }

    const columns = [
        {
            title: 'Name',
            dataIndex: 'name'
        },
        {
            title: 'Item code',
            dataIndex: 'item_code'
        },

        {
            title: 'Unit Price',
            dataIndex: 'unit_price'
        },
        {
            title: 'Min Stock',
            dataIndex: 'min_stock_quantity'
        },
        {
            title: 'Max Stock',
            dataIndex: 'max_stock_quantity'
        },
        {
            title: 'Re-order Stock',
            dataIndex: 'reorder_stock_quantity'
        },
        {
            title: 'Safety Stock',
            dataIndex: 'safety_stock_level'
        },
        {
            title: 'Cycle Code',
            dataIndex: 'cycle_count_code'
        },
        {
            title: 'Expiry',
            dataIndex: 'expiry_date',
            render: (date: string) =>
                date ? dayjs(date).format('YYYY-MM-DD') : '-',
        },
        {
            title: 'Last Stock Date',
            dataIndex: 'last_stock_date',
            render: (date: string) =>
                date ? dayjs(date).format('YYYY-MM-DD') : '-',
        },

        {
            title: 'Actions',
            render: (record: any) => {
                return <Space>
                    <Button onClick={() => onClickEdit(record)} type={'link'}><EditOutlined /></Button>
                    <Popconfirm
                        title="Delete this item?"
                        description="This action cannot be undone"
                        onConfirm={() => handleDeleteClient(record?.id)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type={'link'}><DeleteOutlined /></Button>
                    </Popconfirm>
                    <Link to={`/inventory-item/details/${record.id}`}>
                        <Button type="primary" ghost>
                            <EyeOutlined />
                        </Button>
                    </Link>
                </Space>
            },
        }
    ];

    if (isError) {
        return <p>Failed to load data</p>
    }

    return (
        <Table
            rowKey="id"
            loading={isLoading}
            columns={columns}
            dataSource={fetchData?.data} />
    );
}
