import React, { useState } from 'react';
import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import menuItems from '~/sidebar'
import {useNavigate} from "react-router-dom";

const SideBar: React.FC = () => {
    const [openKeys, setOpenKeys] = useState(['sub1']);

    const navigate = useNavigate();
    // const items = formatItems(menuItems);
    /*const onOpenChange: MenuProps['onOpenChange'] = (keys) => {
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };*/

    return (
        <Menu
            onClick={({key}) => navigate(key)}
            theme={'dark'}
            mode="inline"
            // openKeys={openKeys}
            // onOpenChange={onOpenChange}
            // style={{ width: 256 }}
            items={menuItems}
        />
    );
};

export default SideBar;
