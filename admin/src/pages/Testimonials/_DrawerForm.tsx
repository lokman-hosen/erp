/* eslint-disable */

import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Checkbox, Drawer, Form, Input, Select, Space, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { Option } from "antd/es/mentions";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_URL } from '~/configs';
import { deleteApi, get, patch, post, put } from "~/services/api/api";
import { API_CRUD, API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import { getUrlFromUploadComponent } from "~/utility/upload";




// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();
    const [imagePreview, setImagePreview] = useState(null)
    const [fileList, setFileList] = useState([]);
    const [url, setUrl] = useState("")


    // let url

    const createData = useMutation({
        mutationFn: async (data) => await post(getUrlForModel(model), data.data),
        onSuccess: (response) => {
            message.success('Saved Successfully');
            form.resetFields();
            onSubmitSuccess();
            setUrl(null)
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const updateData = useMutation({
        mutationFn: async (data: any) => await patch(getUrlForModel(model, data.id), data),
        onSuccess: (response) => {
            message.success('Updated Successfully');
            form.resetFields();
            onSubmitSuccess(true);
            setUrl(null)
        },
        onError: () => {
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {

        const url = getUrlFromUploadComponent(formValues, 'image');
        formValues.image = url;

        if (formValues.sort_order) {
            formValues.sort_order = Number(formValues.sort_order)
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

    // if (editedItem) {
    //     if (url !== null && url !== undefined && url !== "") {
    //         editedItem.image = url;
    //     }
    //     const val = {
    //         student_name: editedItem.student_name,
    //         desc: editedItem.desc,
    //         subject: editedItem.subject,
    //         school: editedItem.school,
    //         is_student: Boolean(editedItem.is_student),
    //         sort_order: Number(editedItem.sort_order),
    //     };
    //     form.setFieldsValue(val);
    // } else {
    //     form.resetFields();
    // }
    const handleChange = (value: string) => {
        console.log(`selected ${value}`);
    };


    const fileHandleChange = async (e) => {
        const fileObj = e.target.files && e.target.files[0];
        if (!fileObj) {
            return;
        }
        setImagePreview(URL.createObjectURL(fileObj));
        const formData = new FormData()
        formData.append('file', e.target.files[0])
        const file = await axios.post(API_FILE_UPLOAD, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }).then(res => {
            console.log(res?.data?.data?.url)
            setUrl(res?.data?.data?.url)
        }).catch(err => {
            console.log(err)
        })
    }

    const getImagePreview = () => {
        if (imagePreview) {
            return <img src={imagePreview} alt="" height={80} />
        }
        if (editedItem && editedItem.image) {
            return <img src={editedItem.image} alt="" height={80} />
        }
        return null;
    };



    useEffect(() => {
        if (editedItem) {
            const val = {
                user_name: editedItem.user_name,
                city: editedItem.city,
                school: editedItem.school,
                desc: editedItem.desc,
                sort_order: editedItem.sort_order,
                image: [
                    {
                        uid: "-1",
                        // name: "xxx.png",
                        status: "done",
                        // url:  editedItem.image,
                        thumbUrl: editedItem.image
                    }
                ]
            };
            form.setFieldsValue(val);
        } else {
            form.resetFields();
        }
    }, [editedItem])




    const handleChangeImage = (info) => {

        console.log({ info });
        let fileList = [...info.fileList];

        fileList = fileList.slice(-1);
        setFileList(fileList);
    };

    const normFile = (e) => {
        console.log({ e });
        if (Array.isArray(e)) {
            return e;
        }
        /*if (e?.fileList && Array.isArray(e.fileList)) {
            const file = e.fileList[0];
            if (file && file.status === 'done' && file.response && file.response.success && file.response?.data?.url) {
                return file.response?.data?.url
            }
        }*/
        return e && e.fileList;
    };



    return (
        <>
            <Drawer
                title={isEditing ? "Edit Testimonial" : "Add Testimonial"}
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
                        label="User Name"
                        name="user_name"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="City"
                        name="city"
                        rules={[{ required: true, message: 'This field is required' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Sort Order"
                        name="sort_order"
                    >
                        <Input type="number" />
                    </Form.Item>

                    <Form.Item
                        label="Description"
                        name="desc"
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        name="image"
                        label="Image"
                        valuePropName="fileList"
                        getValueFromEvent={normFile}
                    >
                        <Upload
                            // defaultFileList={[...fileList]}
                            name="file"
                            action={API_FILE_UPLOAD}
                            maxCount={1}
                            listType="picture"
                        >
                            <Button icon={<UploadOutlined />}>Click to Upload</Button>
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
