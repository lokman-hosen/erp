/* eslint-disable */

import { UploadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import {
  Button,
  Drawer,
  Form,
  Input,
  Select,
  Switch,
  Upload,
  message
} from 'antd';
import { useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { get, patch, post } from '~/services/api/api';
import { API_FILE_UPLOAD, getUrlForModel } from '~/services/api/endpoints';
import { getUrlFromUploadComponent } from '~/utility/upload';

const toolbarOptions = [
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],

  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
  [{ header: [1, 2, 3, 4, 5, 6, false] }],

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
];

// @ts-ignore
export default function DrawerForm({
  title,
  model,
  onClose,
  open,
  onSubmitSuccess,
  isEditing,
  editedItem,
  ...props
}) {
  const [form] = Form.useForm();

  const {
    data: allCategories,
  } = useQuery({
    queryKey: ['All-Products-Categories'],
    queryFn: () => get(getUrlForModel('Category')),
    staleTime: 0,
  });

  // console.log("categories =====>", allCategories?.data);



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
    formValues.price = parseFloat(formValues.price);
    formValues.discount_id = parseInt(formValues.discount_id);
    formValues.cost_pert_item = parseFloat(formValues.cost_pert_item);
    formValues.stock_quantity = parseInt(formValues.stock_quantity);
    formValues.weight = parseFloat(formValues.weight);
    formValues.length = parseFloat(formValues.length);
    formValues.wide = parseFloat(formValues.wide);
    formValues.height = parseFloat(formValues.height);
    formValues.store_id = parseInt(formValues.store_id);
    formValues.category_id = parseInt(formValues.category_id);
    formValues.brand_id = parseInt(formValues.brand_id);

    if (formValues.featured_image) {
      const url = getUrlFromUploadComponent(formValues, 'featured_image');
      formValues.featured_image = url;
    }

    if (formValues.experience) {
      formValues.experience = Number(formValues.experience);
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
        name: editedItem?.name,
        permalink: editedItem?.permalink,
        description: editedItem?.description,
        content: editedItem?.content,
        sku: editedItem?.sku,
        price: editedItem?.price,
        discount_id: editedItem?.discount_id,
        cost_pert_item: editedItem?.cost_pert_item,
        barcode: editedItem?.barcode,
        stock_status: editedItem?.stock_status,
        stock_quantity: editedItem?.stock_quantity,
        weight: editedItem?.weight,
        length: editedItem?.length,
        wide: editedItem?.wide,
        height: editedItem?.height,
        status: editedItem?.status,
        store_id: editedItem?.store_id,
        is_featured: editedItem?.is_featured,
        category_id: editedItem?.stock_status,
        brand_id: editedItem?.brand_id,
        collection_tag: editedItem?.collection_tag,
        label: editedItem?.label,
        featured_image: [
          {
            uid: '-1',
            status: 'done',
            thumbUrl: editedItem?.featured_image,
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
        title={isEditing ? 'Update Product' : 'Add Product'}
        width={720}
        onClose={onClose}
        open={open}
        bodyStyle={{ paddingBottom: 80 }}
      >
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
            label="Product Name"
            name="name"
            rules={[{ required: true, message: 'This field is required' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Product Link" name="permalink">
            <Input />
          </Form.Item>

          <Form.Item label="Description" name="description">
            <Input />
          </Form.Item>

          <Form.Item label="Content" name="content">
            <ReactQuill
              theme="snow" // You can choose different themes like 'snow', 'bubble', etc.
              modules={{
                toolbar: toolbarOptions,
              }}
            />
          </Form.Item>

          <Form.Item label="SKU" name="sku">
            <Input />
          </Form.Item>

          <Form.Item label="price" name="price">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="discount" name="discount_id">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Const Per Item" name="cost_pert_item">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Barcode" name="barcode">
            <Input />
          </Form.Item>

          <Form.Item label="Stock Status" name="stock_status">
            <Input />
          </Form.Item>

          <Form.Item label="Stock Quantity" name="stock_quantity">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Weight" name="weight">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Length" name="length">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Wide" name="wide">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Height" name="height">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Status" name="status">
            <Select placeholder="Select Status" showSearch>
              <Select.Option value="pending">Pending</Select.Option>
              <Select.Option value="published">Published</Select.Option>
              <Select.Option value="deny">Deny</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Is Featured" name="is_featured">
            <Switch defaultChecked={false} />
          </Form.Item>

          <Form.Item label="Category" name="category_id">
            <Select placeholder="Select Status" showSearch>
              {allCategories?.data?.map(category => <Select.Option value={category?.id} key={category?.id}>{category?.name}</Select.Option>)}
            </Select>
          </Form.Item>

          <Form.Item label="Brand" name="brand_id">
            <Input type="number" />
          </Form.Item>

          <Form.Item label="Collection Tag" name="collection_tag">
            <Input />
          </Form.Item>

          <Form.Item label="Label" name="label">
            <Input />
          </Form.Item>

          {/* <Form.Item label="barcode" name="barcode">
            <Select placeholder="Assign in city" showSearch>
              {cities &&
                cities?.data?.map((city) => (
                  <Select.Option key={city?.id} value={city?.name}>
                    {city?.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item> */}

          <Form.Item
            label="Image"
            name="featured_image"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload name="file" action={API_FILE_UPLOAD} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>Click to Upload</Button>
            </Upload>
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button
              type="primary"
              htmlType="submit"
              loading={createData.isPending || updateData.isPending}
            >
              Save
            </Button>
          </Form.Item>
        </Form>
      </Drawer>
    </>
  );
}
