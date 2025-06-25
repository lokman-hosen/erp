/* eslint-disable */
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Drawer, Form, Input, Select, Switch, Upload, message } from 'antd';
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { get, patch, post } from "~/services/api/api";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";

const ReceiptModel = "GoodReceipt";
const SupplierModel = "Supplier";


// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const {
        data: ReceiptData,

    } = useQuery({
        queryKey: ["get users", ReceiptModel],
        queryFn: () => get(getUrlForModel(ReceiptModel)),
        staleTime: 0,
        select: (data) => {
            return data?.data ?? []
        }
    });
    const {
        data: SupplierData,

    } = useQuery({
        queryKey: ["get users", SupplierModel],
        queryFn: () => get(getUrlForModel(SupplierModel)),
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

        if (formValues?.good_receipt_id) {
            formValues.good_receipt_id = Number(formValues.good_receipt_id)
        }

        if (formValues?.supplier_id) {
            formValues.supplier_id = Number(formValues.supplier_id)
        }
        // if (formValues?.created_by) {
        //     formValues.created_by = Number(formValues.created_by)
        // }

        if (formValues.return_date !== undefined && formValues.return_date) {
            formValues.return_date = formValues.return_date?.toISOString() ?? null
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
                good_receipt_id: editedItem.good_receipt_id,
                supplier_id: editedItem.supplier_id,
                return_date: editedItem.return_date ? dayjs(editedItem.return_date) : null,
                reason: editedItem.reason,
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
                    <Form.Item label="Supplier" name="supplier_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                SupplierData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.name}</Select.Option>
                                ))
                            }

                            {/* <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Good Receipt" name="good_receipt_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                ReceiptData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.grn_number}</Select.Option>
                                ))
                            }

                            {/* <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option> */}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Reason"
                        name="reason"
                    >
                        <TextArea />
                    </Form.Item>
                    <Form.Item
                        label="Return Date"
                        name="return_date"
                    >
                        <DatePicker style={{ width: '100%' }} />
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
