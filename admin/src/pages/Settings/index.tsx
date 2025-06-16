/* eslint-disable */
import { UploadOutlined } from "@ant-design/icons";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Button, Card, Collapse, Form, Input, Upload, message } from "antd";
import TextArea from "antd/es/input/TextArea";
import { useCallback, useEffect } from "react";
import { getImageFieldsKeys } from "~/pages/Settings/settings";
import { get, post } from "~/services/api/api";
import { API_FILE_UPLOAD, getUrlForModel } from "~/services/api/endpoints";
import { getHeader } from "~/utility/helmet";
import { getUrlFromUploadComponent } from "~/utility/upload";
const { Panel } = Collapse;
const model = 'Setting';
const title = 'Setting';

const KEY = `all-${model}`;


const Settings = () => {
    const [form] = Form.useForm();

    const {
        isLoading,
        isError,
        error,
        data: settingsResponse,
        isSuccess,
        refetch,
    } = useQuery({
        queryKey: [KEY],
        queryFn: () => get(getUrlForModel(model))
    });


    useEffect(() => {
        let data: any = {};
        if (isSuccess && settingsResponse?.data) {
            const imageFields = getImageFieldsKeys();
            settingsResponse?.data?.map((item) => {
                if (imageFields.includes(item.key)) {
                    data[item.key] = [
                        {
                            uid: "-1",
                            status: "done",
                            thumbUrl: item.value
                        }
                    ]
                } else {
                    data[item.key] = item.value;
                }
            })
        }


        if (data) {
            form.setFieldsValue(data);
        }
    }, [isLoading])

    const createData = useMutation({
        mutationFn: async (data) => await post("admin/settings", data.data),
        onSuccess: (response) => {
            refetch()
            form.resetFields()
            message.success('Saved Successfully');
            window.location.reload();
        },
        onError: () => {
            form.resetFields();
            message.error('Something went wrong');
        }
    });

    const onFinish = async (formValues: any) => {
        // const imageFields = getImageFieldsKeys();

        // imageFields.map(item => {
        //     const url = getUrlFromUploadComponent(formValues, item);
        //     formValues[item] = url;
        // })
        const dataArray = [];
        if (formValues.logo) {
            const url = getUrlFromUploadComponent(formValues, 'logo');
            formValues.logo = url;
        }
        if (formValues.favicon) {
            const url = getUrlFromUploadComponent(formValues, 'favicon');
            formValues.favicon = url;
        }
        if (formValues.hero_image) {
            const url = getUrlFromUploadComponent(formValues, 'hero_image');
            formValues.hero_image = url;
        }

        // console.log({ formValues })
        // return
        for (const name in formValues) {
            // if (formValues.hasOwnProperty(name)) {
            //     dataArray.push({ name, value: formValues[name] === undefined && "" ? null : formValues[name] });
            // }
            // console.log({ name })
            dataArray.push({
                key: name,
                value: formValues[name] === undefined && "" ? null : formValues[name]
            })
        }
        console.log("settings data after saving ===>>>", dataArray)
        // return
        createData.mutate({ data: dataArray });
    };

    const getFormFields = useCallback((settings) => {
        return <>
            {settings.map(item => {
                if (item.type === 'text') {
                    return (
                        <Form.Item
                            key={`form-item-${item.key}`}
                            label={item.label}
                            name={item.key}
                        >
                            {
                                item?.field === "textarea" ? <TextArea rows={4} /> : <Input />
                            }
                        </Form.Item>
                    )
                }

                if (item.type === 'image') {
                    return (
                        <Form.Item
                            key={`form-item-${item.key}`}
                            label={item.label}
                            name={item.key}
                            valuePropName="fileList"
                            getValueFromEvent={(e) => {
                                if (Array.isArray(e)) {
                                    return e;
                                }
                                return e && e.fileList;
                            }}
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
                    )
                }


            })

            }
            <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                <Button type="primary" htmlType="submit" loading={createData?.isLoading} >
                    Save
                </Button>
            </Form.Item>
        </>
    }, [form])

    return (
        <>
            {getHeader(title)}
            <Card title="Settings">
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 2 }}
                    wrapperCol={{ span: 16 }}
                    onFinish={onFinish}
                    autoComplete="off"
                >
                    <h3 style={{ borderBottom: "1px ridge" }}>Footer</h3>
                    <Form.Item
                        label="Email"
                        name="email"
                    >
                        <Input type="email" />
                    </Form.Item>
                    <Form.Item
                        label="Phone"
                        name="phone"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Description"
                        name="desc"
                    >
                        <TextArea rows={5} />
                    </Form.Item>
                    <h3 style={{ borderBottom: "1px ridge" }}>Images</h3>
                    <Form.Item
                        label="Logo"
                        name="logo"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
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
                    <Form.Item
                        label="Favicon"
                        name="favicon"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
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
                    <h3 style={{ borderBottom: "1px ridge" }}>Social links</h3>
                    <Form.Item
                        label="Facebook"
                        name="facebook"
                    >
                        <Input type="url" />
                    </Form.Item>
                    <Form.Item
                        label="Instagram"
                        name="instagram"
                    >
                        <Input type="url" />
                    </Form.Item>
                    <Form.Item
                        label="Twitter"
                        name="twitter"
                    >
                        <Input type="url" />
                    </Form.Item>
                    <h3 style={{ borderBottom: "1px ridge" }}>Hero</h3>
                    <Form.Item
                        label="Hero title"
                        name="hero_title"
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item
                        label="Hero description"
                        name="hero_desc"
                    >
                        <TextArea rows={5} />
                    </Form.Item>
                    <Form.Item
                        label="Hero image"
                        name="hero_image"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => {
                            if (Array.isArray(e)) {
                                return e;
                            }
                            return e && e.fileList;
                        }}
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
                    <h3 style={{ borderBottom: "1px ridge" }}>Brand</h3>
                    <Form.Item
                        label="Brand Name"
                        name="brand_name"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="Brand Url"
                        name="brand_url"
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item wrapperCol={{ offset: 2, span: 16 }}>
                        <Button type="primary" htmlType="submit" loading={createData?.isLoading} >
                            Save
                        </Button>
                    </Form.Item>
                </Form>
                {/* <Collapse>
                    <Panel header={`General `} key={1}>
                        <General></General>
                    </Panel>
                    <Panel header={`Images `} key={2}>
                        <Images></Images>
                    </Panel>
                    <Panel header={`Social links`} key={3}>
                        <SocialLink></SocialLink>
                    </Panel>
                    <Panel header={`Hero section:`} key={4}>
                        <Hero></Hero>
                    </Panel>
                </Collapse> */}
            </Card>
        </>
    )
};

export default Settings
