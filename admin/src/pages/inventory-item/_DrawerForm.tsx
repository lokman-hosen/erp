/* eslint-disable */

import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, DatePicker, Drawer, Form, Input, Select, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import React, { useEffect } from "react";
import { patch, post, put } from "~/services/api/api";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";

// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const createData: any = useMutation({
        mutationFn: async (data: any) => await post(getUrlForModel(model), data?.data),
        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const updateData: any = useMutation({
        mutationFn: async (data: any) => await patch(getUrlForModel(model, data.id), data),
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            onSubmitSuccess(true);
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {





        const payload = {
            ...formValues,
            expiry_date: formValues.expiry_date ? formValues.expiry_date.toISOString() : null,
            last_stock_date: formValues.last_stock_date ? formValues.last_stock_date.toISOString() : null,
            // attributes: formValues.attributes ? JSON.parse(formValues.attributes) : null,
            unit_price: Number(formValues.unit_price),
            min_stock_quantity: Number(formValues.min_stock_quantity),
            max_stock_quantity: Number(formValues.max_stock_quantity),
            reorder_stock_quantity: Number(formValues.reorder_stock_quantity),
            safety_stock_level: Number(formValues.safety_stock_level),
        };

        if (isEditing) {
            updateData.mutate({
                ...payload,
                id: editedItem.id,
            });
        } else {
            createData.mutate({
                data: payload,
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    // Fill the form in edit mode
    useEffect(() => {
        if (editedItem) {
            form.setFieldsValue({
                ...editedItem,
                expiry_date: editedItem.expiry_date ? dayjs(editedItem.expiry_date) : null,
                last_stock_date: editedItem.last_stock_date ? dayjs(editedItem.last_stock_date) : null,
                attributes: editedItem.attributes ? JSON.stringify(editedItem.attributes, null, 2) : '',
            });
        } else {
            form.resetFields();
        }
    }, [editedItem]);

    return (
        <>
            <Drawer
                title={title}
                width={720}
                onClose={onClose}
                open={open}
                bodyStyle={{ paddingBottom: 80 }}>
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >

                    <Form.Item
                        label="Name"
                        name="name"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Item Code"
                        name="item_code"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Unit Price"
                        name="unit_price"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Min Stock Quantity"
                        name="min_stock_quantity"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Max Stock Quantity"
                        name="max_stock_quantity"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Reorder Stock Quantity"
                        name="reorder_stock_quantity"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Safety Stock Level"
                        name="safety_stock_level"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Expiry Date"
                        name="expiry_date"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Last Stock Date"
                        name="last_stock_date"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Cycle Count Code"
                        name="cycle_count_code"
                    >
                        <Input placeholder="Enter cycle count code" />
                    </Form.Item>

                    <Form.Item
                        label="Attributes (JSON)"
                        name="attributes"
                        // rules={[
                        //     {
                        //         validator: (_, value) => {
                        //             if (!value) return Promise.resolve();
                        //             try {
                        //                 JSON.parse(value);
                        //                 return Promise.resolve();
                        //             } catch {
                        //                 return Promise.reject('Invalid JSON format');
                        //             }
                        //         },
                        //     },
                        // ]}
                    >
                        <Input.TextArea
                            placeholder="Enter JSON attributes"
                            rows={4}
                        />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={createData.isLoading || updateData.isLoading}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}
