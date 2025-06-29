/* eslint-disable */
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, DatePicker, Drawer, Form, Input, Select, message } from 'antd';
import TextArea from "antd/es/input/TextArea";
import dayjs from "dayjs";
import { useEffect } from "react";
import 'react-quill/dist/quill.snow.css';
import { get, patch, post } from "~/services/api/api";
import { getUrlForModel } from "~/services/api/endpoints";

const StockTakes = "StockTakes";
// const Supplier = "Supplier";


// @ts-ignore
export default function DrawerForm({ title, model, onClose, open, onSubmitSuccess, isEditing, editedItem, ...props }) {

    const [form] = Form.useForm();

    const {
        data: StockTakesData,
    } = useQuery({
        queryKey: ["get-all-stock-takes-data"],
        queryFn: () => get(getUrlForModel(StockTakes)),
        staleTime: 0,
        select: (data) => {
            return data?.data ?? []
        }
    });
    // const {
    //     data: supplierData,

    // } = useQuery({
    //     queryKey: ["get-all", Supplier],
    //     queryFn: () => get(getUrlForModel(Supplier)),
    //     staleTime: 0,
    //     select: (data) => {
    //         return data?.data ?? []
    //     }
    // });

    // console.log("location data, ", supplierData)
    console.log("InventoryData data, ", StockTakesData)



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
        if (formValues?.member_id) {
            formValues.member_id = Number(formValues.member_id)
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
                stock_take_id: editedItem.stock_take_id,
                member_id: editedItem.member_id,
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
                    <Form.Item label="Stock Takes" name="stock_take_id">
                        <Select placeholder="Select Status" showSearch>
                            {
                                StockTakesData?.map((data, index) => (
                                    <Select.Option key={index} value={data?.id}>{data?.type}</Select.Option>
                                ))
                            }

                            {/* <Select.Option value="Pending">Pending</Select.Option>
                            <Select.Option value="Approved">Approved</Select.Option>
                            <Select.Option value="Rejected">Rejected</Select.Option> */}
                        </Select>
                    </Form.Item>


                    <Form.Item
                        label="Member Id"
                        name="member_id"
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
