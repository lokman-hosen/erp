/* eslint-disable */
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Drawer, Form, Input, Select, Switch, Upload, message } from 'antd';
import dayjs from "dayjs";
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

        if (formValues?.purchase_order_id) {
            formValues.purchase_order_id = Number(formValues.purchase_order_id)
        }
        if (formValues?.created_by) {
            formValues.created_by = Number(formValues.created_by)
        }

        if (formValues.receipt_date !== undefined && formValues.receipt_date) {
            formValues.receipt_date = formValues.receipt_date?.toISOString() ?? null
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
                grn_number: editedItem.grn_number,
                purchase_order_id: editedItem.purchase_order_id,
                receipt_date: editedItem.receipt_date ? dayjs(editedItem.receipt_date) : null,
                status: editedItem.status,
                created_by: editedItem.created_by,
                remarks: editedItem.remarks,
                return_status: editedItem.return_status,
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
                    <Form.Item label="Status" name="status">
                        <Select placeholder="Select Status" showSearch>
                            {/* {
                                UserData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.name}</Select.Option>
                                ))
                            } */}

                            <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option>
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="GRN Number"
                        name="grn_number"
                    >
                        <Input type="text" />
                    </Form.Item>
                    <Form.Item
                        label="Purchase Order Id"
                        name="purchase_order_id"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Created By"
                        name="created_by"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Remarks"
                        name="remarks"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Receipt Date"
                        name="receipt_date"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>

                    <Form.Item
                        label="Return Status"
                        name="return_status"
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
