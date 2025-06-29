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

const InventoryItem = "InventoryItem";
const StockLocation = "StockLocation";


// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const {
        data: InventoryData,

    } = useQuery({
        queryKey: ["get users", InventoryItem],
        queryFn: () => get(getUrlForModel(InventoryItem)),
        staleTime: 0,
        select: (data) => {
            return data?.data ?? []
        }
    });
    const {
        data: locationData,

    } = useQuery({
        queryKey: ["get users", StockLocation],
        queryFn: () => get(getUrlForModel(StockLocation)),
        staleTime: 0,
        select: (data) => {
            return data?.data ?? []
        }
    });

    console.log("location data, ", locationData)
    console.log("InventoryData data, ", InventoryData)



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

        if (formValues?.quantity) {
            formValues.quantity = Number(formValues.quantity)
        }

        // if (formValues?.supplier_id) {
        //     formValues.supplier_id = Number(formValues.supplier_id)
        // }
        // if (formValues?.created_by) {
        //     formValues.created_by = Number(formValues.created_by)
        // }

        if (formValues.movement_date !== undefined && formValues.movement_date) {
            formValues.movement_date = formValues.movement_date?.toISOString() ?? null
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
                inventory_item_id: editedItem.inventory_item_id,
                from_location_id: editedItem.from_location_id,
                to_location_id: editedItem.to_location_id,
                quantity: editedItem.quantity,
                movement_type: editedItem.movement_type,
                movement_date: editedItem.movement_date ? dayjs(editedItem.movement_date) : null,

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
                    <Form.Item label="Inventory Item" name="inventory_item_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                InventoryData?.map((data, index) => (
                                    <Select.Option key={index} value={data?.id}>{data?.name}</Select.Option>
                                ))
                            }

                            {/* <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="From" name="from_location_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                locationData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.name}</Select.Option>
                                ))
                            }

                            {/* <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="To" name="to_location_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                locationData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.name}</Select.Option>
                                ))
                            }

                            {/* <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Movement Type" name="movement_type">
                        <Select placeholder="Select Status" showSearch>
                            {/* {
                                locationData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.name}</Select.Option>
                                ))
                            } */}

                            <Select.Option value="Issue">Issue</Select.Option>
                            <Select.Option value="Receipt">Receipt</Select.Option>
                            <Select.Option value="Transfer">Transfer</Select.Option>
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="Movement Date"
                        name="movement_date"
                    >
                        <DatePicker style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item
                        label="Quantity"
                        name="quantity"
                    >
                        <Input type="number" />
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
