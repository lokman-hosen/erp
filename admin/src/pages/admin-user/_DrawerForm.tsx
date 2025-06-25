/* eslint-disable */
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Divider, Drawer, Form, Image, Input, Select, Space, Switch, Upload, message } from 'antd';
import TextArea from "antd/es/input/TextArea";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { patch, post, put } from "~/services/api/api";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import { getUrlFromUploadComponent } from "~/utility/upload";


// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();




    const createData = useMutation({
        mutationFn: async (data: any) => await post(getUrlForModel(model), data.data),
        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
        },
        onError: () => {
            message.error('Something went wrong');
        },
    });

    const updateData:any = useMutation({
        mutationFn: async (data: any) => await patch(getUrlForModel(model, data.id), data),
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            onSubmitSuccess(true);
        },
        onError: () => {
            message.error('Something went wrong');
        },
    });

    const onFinish = async (formValues: any) => {

        if (formValues?.profile_photo) {
            const img_url = formValues?.profile_photo[0]?.response?.url ?? formValues?.profile_photo[0]?.thumbUrl;
            formValues.profile_photo = img_url;
        }


        if (isEditing) {
            updateData.mutate({
                ...formValues,
                id: editedItem.id,
            });
        } else {
            // @ts-ignore
            createData.mutate({
                data: formValues,
            });
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (editedItem) {
            const val = {
                first_name: editedItem?.first_name,
                last_name: editedItem?.last_name,
                email: editedItem?.email,
                phone: editedItem?.phone,
                password: editedItem?.password,
                profile_photo: [
                    {
                        uid: '-1',
                        status: 'done',
                        thumbUrl: editedItem?.profile_photo,
                    },
                ],
            };
            form.setFieldsValue(val);
        } else {
            form.resetFields();
        }
    }, [isEditing]);

    const normFile = (e) => {
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    return (
        <>
            <Drawer
                title={title}
                width={600}
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
                        label="Password"
                        name="password"
                    >
                        <Input type="password" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>

                    <br />

                    <Form.Item
                        name="profile_photo"
                        label="Cover Image"
                        rules={[{ required: false, message: 'Required' }]}
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
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
                        <Button type="primary" htmlType="submit" loading={updateData.isLoading}>
                            Save
                        </Button>
                    </Form.Item>
                </Form>


            </Drawer>
        </>
    );
}
