/* eslint-disable */

import { UploadOutlined } from "@ant-design/icons";
import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import React from "react";
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
        // if (formValues.sort_order !== undefined && formValues.sort_order !== null) {
        //     formValues.sort_order = Number(formValues.sort_order)
        // }
        if (isEditing) {

            updateData.mutate({
                ...formValues,
                id: editedItem.id
            })
        } else {
            // @ts-ignore
            createData.mutate({
                data: formValues
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (editedItem) {
        const val = {
            name: editedItem.name,
            permalink: editedItem.permalink,
            description: editedItem.description,
            content: editedItem.content,
            status: editedItem.status,
            templete: editedItem.templete,
            image: editedItem.image,
        };
        form.setFieldsValue(val);
    } else {
        form.resetFields();
    }

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
                        label="Permalink"
                        name="permalink"
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
                        label="Content"
                        name="content"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Templete"
                        name="templete"
                        rules={[{ required: false, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        name="status"
                        label="Status"
                        rules={[
                            { required: true, message: 'Please select the status.' },
                        ]}
                    >
                        <Select placeholder="Select status">
                            <Option value="Pending">Pending</Option>
                            <Option value="Approved">Approved</Option>
                            <Option value="Rejected">Rejected</Option>
                            {/* Add more statuses as needed */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        name="profile_image"
                        label="Cover Image"
                        rules={[{ required: false, message: 'Required' }]}
                        valuePropName="fileList"
                    // getValueFromEvent={normFile}
                    >

                        <Upload
                            accept='.jpg, .png, .gif, .tiff, .bmp, and .webp'
                            name="file"
                            action={API_FILE_UPLOAD}
                            maxCount={1}
                            listType="picture-card"
                        >
                            <div className="flex flex-col items-center justify-center">
                                <UploadOutlined />
                                <span>Upload</span>
                            </div>
                        </Upload>
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
