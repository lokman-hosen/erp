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
        mutationFn: async (data) => await post(getUrlForModel(model), data.data),
        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
        },
        onError: () => {
            message.error('Something went wrong');
        },
    });

    const updateData = useMutation({
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

        if (formValues.blog_image) {
            const url = getUrlFromUploadComponent(formValues, 'blog_image');
            formValues.blog_image = url;
        }
        if (formValues.author_image) {
            const url = getUrlFromUploadComponent(formValues, 'author_image');
            formValues.author_image = url;
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
                author_name: editedItem?.author_name,
                category: editedItem?.category,
                title: editedItem?.title,
                content: editedItem?.content,
                short_desc: editedItem?.short_desc,
                author_image: [
                    {
                        uid: '-1',
                        status: 'done',
                        thumbUrl: editedItem?.author_image,
                    },
                ],
                blog_image: [
                    {
                        uid: '-1',
                        status: 'done',
                        thumbUrl: editedItem?.blog_image,
                    },
                ],
            };
            form.setFieldsValue(val);
        } else {
            form.resetFields();
        }
    }, [isEditing]);

    const normFile = (e) => {
        console.log({ e });
        if (Array.isArray(e)) {
            return e;
        }
        return e && e.fileList;
    };


    return (
        <>
            <Drawer
                title={title}
                width={1000}
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
                        label="Author Name"
                        name="author_name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Category"
                        name="category"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Blog Title"
                        name="title"
                    >
                        <Input />
                    </Form.Item>


                    <Form.Item
                        label="Short Description"
                        name="short_desc"
                    >
                        <TextArea />
                    </Form.Item>

                    <Form.Item name="content" label="Content">
                        <ReactQuill
                            theme="snow" // You can choose different themes like 'snow', 'bubble', etc.
                            modules={{
                                toolbar: [
                                    [{ header: '1' }, { header: '2' }, { font: [] }],
                                    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                                    [{ list: 'ordered' }, { list: 'bullet' }],
                                    ['link', 'image'],
                                    ['clean'],
                                ],
                            }}
                        />
                    </Form.Item>
                    <br />

                    <Form.Item
                        label="Image"
                        name="author_image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="file" action={API_FILE_UPLOAD} maxCount={1} listType="picture">
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
                        </Upload>
                    </Form.Item>
                    <br />
                    <Form.Item
                        label="Image"
                        name="blog_image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload name="file" action={API_FILE_UPLOAD} maxCount={1} listType="picture">
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
