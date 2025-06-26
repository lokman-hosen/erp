/* eslint-disable */

import { DeleteOutlined, EditOutlined, EyeOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Table, Tag, message } from "antd";
import Title from "antd/es/typography/Title";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteApi, get, post } from "~/services/api/api";
import { API_CRUD_FIND_WHERE, getUrlForModel } from "~/services/api/endpoints";

// @ts-ignore
export default function _TableGrid({ model, trigger, onClickEdit, ...props }) {
    const KEY = `all-${model}`;

    const {
        isLoading,
        isError,
        data: fetchData,
        refetch,
    } = useQuery({
        queryKey: [`get-${model}-price-list`],
        queryFn: async () =>
            await post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
                include: {
                    InventoryItem: true,
                    StockTakes: true
                },
                refetchOnWindowFocus: false,
            }),
        select(data) {
            return data?.data ?? [];
        },
    });


    console.log("fetchData", fetchData)


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
            title: 'Inventory',
            dataIndex: 'inventory_item_id',
            render: (_, record) => <>{record?.InventoryItem?.name}</>
        },
        {
            title: 'Stock Takes',
            dataIndex: 'inventory_item_id',
            render: (_, record) => <>{record?.StockTakes?.type}</>
        },

        {
            title: 'System Quantity',
            dataIndex: 'system_quantity'
        },
        {
            title: 'Physical Quantity',
            dataIndex: 'physical_quantity'
        },
        {
            title: 'Variance',
            dataIndex: 'variance'
        },
        // {
        //     title: 'Last Valuation',
        //     dataIndex: 'last_valuation_date',
        //     render: (date: string) =>
        //         date ? dayjs(date).format('YYYY-MM-DD') : '-',
        // },
        {
            title: 'Actions',
            render: (record: any) => {
                // console.log(record)
                return <Space>
                    <Button onClick={() => onClickEdit(record)} type={'link'}><EditOutlined /></Button>
                    <Popconfirm
                        title="Delete this item?"
                        description="This action cannot be undone"
                        onConfirm={() => handleDeleteClient(record.id)}
                        onCancel={() => { }}
                        okText="Yes"
                        cancelText="No"
                    >
                        <Button danger type={'link'}><DeleteOutlined /></Button>
                    </Popconfirm>
                    <Link to={`/blog/details/${record.id}`}>
                        <Button type="primary" ghost>
                            <EyeOutlined />
                        </Button>
                    </Link>
                </Space>
            },
        },
    ];

    if (isError) {
        return <p>Failed to load data</p>
    }

    return (
        <>
            <Table
                rowKey="id"
                loading={isLoading}
                columns={columns}
                dataSource={fetchData}
            />
        </>
    );
}
