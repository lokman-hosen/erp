/* eslint-disable */
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Drawer, Form, Input, Select, Switch, Upload, message } from 'antd';
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { get, patch, post } from "~/services/api/api";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";

const UserModal = "User"

// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const {
        isLoading,
        isError,
        error,
        data: UserData,
        refetch,
    } = useQuery({
        queryKey: ["get users", UserModal],
        queryFn: () => get(getUrlForModel(UserModal)),
        staleTime: 0,
        select: (data) => {
            return data?.data ?? []
        }
    });

    // console.log("user data, ", UserData)



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

    const updateData: any = useMutation({
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

        // return console.log("formvalues", formValues)

        if (formValues?.user_id) {
            // const img_url = formValues?.profile_photo[0]?.response?.url ?? formValues?.profile_photo[0]?.thumbUrl;
            // formValues.profile_photo = img_url;
            formValues.user_id = Number(formValues.user_id)
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
                user_id: editedItem.user_id,
                name: editedItem?.name,
                email: editedItem?.email,
                phone: editedItem?.phone,
                alternative_phone: editedItem.alternative_phone,
                address_line_1: editedItem.address_line_1,
                address_line_2: editedItem.address_line_2,
                city: editedItem.city,
                postal_cdoe: editedItem.postal_cdoe,
                country: editedItem.country,
                is_billing_address: editedItem.is_billing_address,

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
                    <Form.Item label="Select User" name="user_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                UserData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.name}</Select.Option>
                                ))
                            }

                            {/* <Select.Option value="Annual">Annual</Select.Option>
                            <Select.Option value="Periodic">Periodic</Select.Option>
                            <Select.Option value="AdHoc">AdHoc</Select.Option>
                            <Select.Option value="Selective">Selective</Select.Option> */}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Name"
                        name="name"
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
                        label="Alternative Phone"
                        name="alternative_phone"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address 1"
                        name="address_line_1"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Address 2"
                        name="address_line_2"
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
                        label="Postal code"
                        name="postal_cdoe"
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
                        label="Is Billing"
                        name="is_billing_address"
                        valuePropName="checked"
                    >
                        <Switch />
                    </Form.Item>

                    <br />
                   
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
