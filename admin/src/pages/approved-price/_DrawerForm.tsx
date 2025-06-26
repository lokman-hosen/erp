/* eslint-disable */
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Drawer, Form, Input, Select, message } from 'antd';
import dayjs from "dayjs";
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { get, patch, post } from "~/services/api/api";
import { getUrlForModel } from "~/services/api/endpoints";

const InventoryItem = "InventoryItem";
const Supplier = "Supplier";


// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const {
        data: InventoryData,
    } = useQuery({
        queryKey: ["get-all", InventoryItem],
        queryFn: () => get(getUrlForModel(InventoryItem)),
        staleTime: 0,
        select: (data) => {
            return data?.data ?? []
        }
    });
    const {
        data: supplierData,

    } = useQuery({
        queryKey: ["get-all", Supplier],
        queryFn: () => get(getUrlForModel(Supplier)),
        staleTime: 0,
        select: (data) => {
            return data?.data ?? []
        }
    });

    console.log("location data, ", supplierData)
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

        if (formValues?.price) {
            formValues.price = Number(formValues.price)
        }

        // if (formValues?.supplier_id) {
        //     formValues.supplier_id = Number(formValues.supplier_id)
        // }
        // if (formValues?.created_by) {
        //     formValues.created_by = Number(formValues.created_by)
        // }

        if (formValues.effective_date !== undefined && formValues.effective_date) {
            formValues.effective_date = formValues.effective_date?.toISOString() ?? null
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
                supplier_id: editedItem.supplier_id,
                price: editedItem.price,
                effective_date: editedItem.effective_date ? dayjs(editedItem.effective_date) : null,

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
                    <Form.Item label="Supplier" name="inventory_item_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                InventoryData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.name}</Select.Option>
                                ))
                            }

                            {/* <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item label="Supplier" name="supplier_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                supplierData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.name}</Select.Option>
                                ))
                            }

                            {/* <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option> */}
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="Price"
                        name="price"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Effective Date"
                        name="effective_date"
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
