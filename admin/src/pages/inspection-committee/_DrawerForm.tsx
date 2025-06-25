/* eslint-disable */

import { useMutation } from "@tanstack/react-query";
import { Button, Checkbox, DatePicker, Drawer, Form, Input, Select, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import dayjs from "dayjs";
import React from "react";
import { patch, post, put } from "~/services/api/api";
import { getUrlForModel } from "~/services/api/endpoints";

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

        if (formValues.valid_until !== undefined && formValues.valid_until) {
            formValues.valid_until = formValues.valid_until.toISOString() ?? null
        }
        if (formValues.created_by) {
            formValues.created_by = Number(formValues.created_by)
        }

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
            created_by: editedItem.created_by,
            valid_until: editedItem.valid_until ? dayjs(editedItem.valid_until) : null,
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
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Created By"
                        name="created_by"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Valid Until"
                        name="valid_until"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    {/* <Form.Item
                        label="For Faq"
                        name="type"
                    >
                        <Select placeholder="For Faq">
                            <Option value="teacher" >teacher</Option>
                            <Option value="student">student</Option>
                        </Select>
                    </Form.Item> */}

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
