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
            start_date: formValues.start_date ? formValues.start_date.toISOString() : null,
            end_date: formValues.end_date ? formValues.end_date.toISOString() : null,
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
                start_date: editedItem.start_date ? dayjs(editedItem.start_date) : null,
                end_date: editedItem.end_date ? dayjs(editedItem.end_date) : null,
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
                        label="Start Date"
                        name="start_date"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="End Date"
                        name="end_date"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Type" name="type">
                        <Select placeholder="Select Status" showSearch>
                            <Select.Option value="Annual">Annual</Select.Option>
                            <Select.Option value="Periodic">Periodic</Select.Option>
                            <Select.Option value="AdHoc">AdHoc</Select.Option>
                            <Select.Option value="Selective">Selective</Select.Option>
                        </Select>
                    </Form.Item>
                    <Form.Item label="Status" name="status">
                        <Select placeholder="Select Status" showSearch>
                            <Select.Option value="Scheduled">Scheduled</Select.Option>
                            <Select.Option value="InProgress">InProgress</Select.Option>
                            <Select.Option value="Completed">Completed</Select.Option>
                            <Select.Option value="Cancelled">Cancelled</Select.Option>
                        </Select>
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
