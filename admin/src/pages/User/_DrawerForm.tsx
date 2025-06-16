/* eslint-disable */

import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, Space, Switch, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import React from "react";
import { SERVER_URL } from '~/configs';
import { deleteApi, get, patch, post, put } from "~/services/api/api";
import { API_CRUD, getUrlForModel } from "~/services/api/endpoints";




// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const updateData = useMutation({
        mutationFn: async (data: any) => await patch(getUrlForModel("User", data.id), data),
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
        if (isEditing) {
            updateData.mutate({
                ...formValues,
                id: editedItem.id
            })
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    if (editedItem) {
        const val = {
            first_name: editedItem?.first_name,//
            last_name: editedItem?.last_name,//
            profile_photo: editedItem?.profile_photo,
            email: editedItem?.email,//
            phone: editedItem?.phone,//
            address: editedItem?.address,
            city: editedItem?.city,
            postal_code: editedItem?.postal_code,
            country: editedItem?.country,
            state: editedItem?.state,
            short_desc: editedItem?.short_desc,
            description: editedItem?.description,
            is_verified: editedItem?.is_verified,
            advisor_id: editedItem?.advisor_id,
            // profile_photo

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
                        label="First Name"
                        name="first_name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Last Name"
                        name="last_name"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Address"
                        name="address"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Postal code"
                        name="postal_code"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="State"
                        name="state"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="City"
                        name="city"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Country"
                        name="country"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Short description"
                        name="short_desc"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="description"
                    >
                        <Input.TextArea />
                    </Form.Item>
                    <Form.Item label="Is Verified" name="is_verified" >
                        <Switch defaultChecked={editedItem?.is_verified} />
                    </Form.Item>




                    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={updateData.isLoading}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </>
    );
}
