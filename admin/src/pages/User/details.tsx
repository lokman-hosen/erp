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
  Typography
} from 'antd';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserReferral from '~/components/user-referral/UserReferral';
import QuizzAnswers from '~/old-pages/quizz-answers';
import { post } from '~/services/api/api';
import { API_CRUD_FIND_WHERE } from '~/services/api/endpoints';
import DrawerForm from './_DrawerForm';
const { Title } = Typography;


const UserDetails = () => {

  const drawerTitle = 'Update User';
  const model = 'User';

  const BASE_URL = '/user';
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
    isSuccess
  } = useQuery({
    queryKey: [`user-details-${id}`],
    queryFn: () => post(`${API_CRUD_FIND_WHERE}?model=User`, {
      "where": {
        "id": Number(id)
      },
    }),
  })


  if (isLoading || !isSuccess || details === undefined) {
    return <Spin />
  }
  // profile_photo

  const onClickEdit = (record: any) => {
    setIsEditing(true);
    setEditedItem(record);
    setOpen(true);
  }

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
    setTrigger(trigger => trigger + 1)
    if (isEditing) {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
      refetch()
    } else {
      setOpen(false);
      setIsEditing(false);
      setEditedItem(null);
      refetch()
    }
  }

  console.log(details);

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
      <Card bordered={true} style={{ width: "100%" }}>
        <Space wrap style={{ display: 'flex', justifyContent: 'end' }}>
          <Button type="primary" onClick={() => onClickEdit(details?.data[0])} icon={<EditOutlined />} >Edit</Button>
        </Space>
        <Divider>
          <Image height={200} src={details?.data[0]?.profile_photo}></Image>
        </Divider>
        <Descriptions>
          <Descriptions.Item label="Name">{details?.data[0]?.first_name} {details?.data[0]?.last_name}</Descriptions.Item>
          <Descriptions.Item label="Email">{details?.data[0]?.email}</Descriptions.Item>
          <Descriptions.Item label="Phone">{details?.data[0]?.phone}</Descriptions.Item>
          <Descriptions.Item label="Post code">{details?.data[0]?.postal_code}</Descriptions.Item>
          <Descriptions.Item label="State">{details?.data[0]?.state}</Descriptions.Item>
          <Descriptions.Item label="City">{details?.data[0]?.city}</Descriptions.Item>
          <Descriptions.Item label="Country">{details?.data[0]?.country}</Descriptions.Item>
          <Descriptions.Item label="Address">{details?.data[0]?.address}</Descriptions.Item>
          <Descriptions.Item label="Short description">{details?.data[0]?.short_desc}</Descriptions.Item>

          <Descriptions.Item label="Is Verified">{details?.data[0]?.is_verified ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>}</Descriptions.Item>
          <br />
          <br />
          <Descriptions.Item span={3} label="Description">{details?.data[0]?.description}</Descriptions.Item>
        </Descriptions>
      </Card>

    </>
  );
};

export default UserDetails;
