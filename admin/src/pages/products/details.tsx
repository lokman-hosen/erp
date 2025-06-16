/* eslint-disable */

import { EditOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import {
  Button,
  Card,
  Descriptions,
  Divider,
  Image,
  Space,
  Spin,
  Tag,
  Typography,
} from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { get } from '~/services/api/api';
import { API_CRUD } from '~/services/api/endpoints';
import DrawerForm from './_DrawerForm';
const { Title } = Typography;

const ProductDetail = () => {
  const drawerTitle = 'Update Product';
  const model = 'Product';

  const BASE_URL = '/students';
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [editedItem, setEditedItem] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [trigger, setTrigger] = useState(0);

  const { id } = useParams(); // read id parameter from the url

  const {
    isLoading,
    isError,
    error,
    data: details,
    refetch,
    isSuccess,
  } = useQuery({
    queryKey: [`product-details-${id}`],
    queryFn: () => get(`${API_CRUD}/${id}?model=Product`),
  });

  // console.log(details);

  if (isLoading || !isSuccess || details === undefined) {
    return <Spin />;
  }

  const onClickEdit = (record: any) => {
    setIsEditing(true);
    setEditedItem(record);
    setOpen(true);
  };

  const showDrawer = () => {
    setOpen(true);
    setIsEditing(false);
    setEditedItem(null);
  };

  const onClose = () => {
    setOpen(false);
    // refetch()
  };

  const onSubmitSuccess = (isEditing: boolean) => {
    setTrigger((trigger) => trigger + 1);
    if (isEditing) {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
      refetch();
    } else {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
      refetch();
    }
  };

  return (
    <>
      <DrawerForm
        title={drawerTitle}
        onClose={onClose}
        open={open}
        model={model}
        isEditing={isEditing}
        editedItem={editedItem}
        onSubmitSuccess={onSubmitSuccess}
      />
      <Space wrap style={{ display: 'flex', justifyContent: 'space-between' }}>
        <Title level={2}>{details?.data?.name} </Title>
      </Space>
      <Card bordered={true} style={{ width: '100%' }}>
        <Space wrap style={{ display: 'flex', justifyContent: 'end' }}>
          <Button
            type="primary"
            onClick={() => onClickEdit(details?.data)}
            icon={<EditOutlined />}
          >
            Edit
          </Button>
        </Space>
        <Divider>
          <Image width={200} src={details?.data?.featured_image}></Image>
        </Divider>
        <Descriptions>
          <Descriptions.Item label="name">{details?.data?.name}</Descriptions.Item>

          <Descriptions.Item label="Permalink">
            {details?.data?.permalink}
          </Descriptions.Item>
          <Descriptions.Item label="Description">
            {details?.data?.description}
          </Descriptions.Item>
          <Descriptions.Item label="content">{details?.data?.content}</Descriptions.Item>
          <Descriptions.Item label="SKU">{details?.data?.sku}</Descriptions.Item>
          <Descriptions.Item label="Price">{details?.data?.price}</Descriptions.Item>
          <Descriptions.Item label="Discount">
            {details?.data?.discount_id}
          </Descriptions.Item>
          <Descriptions.Item label="Stock Status">
            {details?.data?.stock_status}
          </Descriptions.Item>
          <Descriptions.Item label="Stock Quantity">
            {details?.data?.stock_quantity}
          </Descriptions.Item>
          <Descriptions.Item label="Weight">{details?.data?.weight}</Descriptions.Item>
          <Descriptions.Item label="Length">{details?.data?.length}</Descriptions.Item>
          <Descriptions.Item label="Wide">{details?.data?.wide}</Descriptions.Item>
          <Descriptions.Item label="Height">{details?.data?.height}</Descriptions.Item>
          <Descriptions.Item label="Status">{details?.data?.status}</Descriptions.Item>
          <Descriptions.Item label="Store Id">
            {details?.data?.store_id}
          </Descriptions.Item>
          <Descriptions.Item label="Is Featured">
            {details?.data?.is_featured ? (
              <Tag color="green">Yes</Tag>
            ) : (
              <Tag color="red">No</Tag>
            )}
          </Descriptions.Item>
          <Descriptions.Item label="Category">
            {details?.data?.category_id}
          </Descriptions.Item>
          <Descriptions.Item label="Brand">{details?.data?.brand_id}</Descriptions.Item>
          <Descriptions.Item label="Collection Tag">
            {details?.data?.collection_tag}
          </Descriptions.Item>
          <Descriptions.Item label="Label">{details?.data?.label}</Descriptions.Item>
        </Descriptions>
      </Card>
    </>
  );
};

export default ProductDetail;
