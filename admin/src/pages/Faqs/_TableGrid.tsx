/* eslint-disable */

import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Popconfirm, Space, Table, message } from "antd";
import { useEffect } from "react";
import { deleteApi, post } from "~/services/api/api";
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
        queryKey: [`get-${KEY}-list`],
        queryFn: async () =>
            await post(`${API_CRUD_FIND_WHERE}?model=${model}`, {
                include: {
                    Page: true,
                },
                refetchOnWindowFocus: false,
            }),
        select(data) {
            return data?.data ?? [];
        },
    });

    console.log("fetchdata", fetchData)


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
            title: 'Page',
            dataIndex: 'page',
            render: (_, record)=><>{record?.Page?.name}</>
        },
        {
            title: 'Question',
            dataIndex: 'question'
        },
        {
            title: 'Answer',
            dataIndex: 'answer'
        },
        // {
        //     title: 'Type',
        //     dataIndex: 'type'
        // },
        // {
        //     title: 'Sort Order',
        //     dataIndex: 'sort_order'
        // },
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
            dataSource={fetchData} />
    );
}
