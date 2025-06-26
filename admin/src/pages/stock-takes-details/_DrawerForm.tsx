/* eslint-disable */
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Drawer, Form, Input, Select, message } from 'antd';
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { get, patch, post } from "~/services/api/api";
import { getUrlForModel } from "~/services/api/endpoints";

const InventoryItem = "InventoryItem";
const StockTakes = "StockTakes";


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
        data: StockTakesData,

    } = useQuery({
        queryKey: ["get-all", StockTakes],
        queryFn: () => get(getUrlForModel(StockTakes)),
        staleTime: 0,
        select: (data) => {
            return data?.data ?? []
        }
    });

    console.log("StockTakesData data, ", StockTakesData)
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

        if (formValues?.system_quantity) {
            formValues.system_quantity = Number(formValues.system_quantity)
        }
        if (formValues?.physical_quantity) {
            formValues.physical_quantity = Number(formValues.physical_quantity)
        }
        if (formValues?.variance) {
            formValues.variance = Number(formValues.variance)
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
                stock_take_id: editedItem.stock_take_id,
                system_quantity: editedItem.system_quantity,
                physical_quantity: editedItem.physical_quantity,
                variance: editedItem.variance,
                comments: editedItem.comments,

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
                                    <Select.Option value={data?.id}>{data?.name}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item label="Stock Takes" name="stock_take_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                StockTakesData?.map((data, index) => (
                                    <Select.Option value={data?.id}>{data?.type}</Select.Option>
                                ))
                            }
                        </Select>
                    </Form.Item>
                    <Form.Item
                        label="System Quantity"
                        name="system_quantity"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Physical Quantity"
                        name="physical_quantity"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Variance"
                        name="variance"
                    >
                        <Input type="number" />
                    </Form.Item>
                    <Form.Item
                        label="Comments"
                        name="comments"
                    >
                        <TextArea />
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
