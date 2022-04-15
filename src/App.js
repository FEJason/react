
import React, { useState, useEffect } from 'react';
import { Layout, Menu } from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
  VideoCameraOutlined,
  UploadOutlined,
  MailOutlined
} from '@ant-design/icons';

import './App.scss';
import { Outlet, Link, useLocation  } from "react-router-dom";

const { Header, Sider, Content } = Layout;
const { SubMenu } = Menu;

function App() {
  // 返回当前 location 对象，获取pathname
  let location = useLocation();
  // 获取当前展开的 SubMenu 菜单项 key 
  let openKey = location.pathname.split('/')[1]
  const [collapsed, setCollapsed] = useState(false)
  const [selectedKey, setSelectedKey] = useState([])
  const [openKeys, setOpenKeys] = useState([]);
  const rootSubmenuKeys = ['goods', 'user'];

  useEffect(() => {
    // 当前选中的菜单项 key 数组
    setSelectedKey([location.pathname])
    // 当前展开的 SubMenu 菜单项 key 数组
    setOpenKeys([openKey])
  }, [location, openKey]) // 当前路由更改时执行

  // antd官方
  // 只展开当前父级菜单
  // 点击菜单，收起其他展开的所有菜单，保持菜单聚焦简洁。
  const onOpenChange = keys => {
    // 返回匹配条件的数组
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const toggle = () => {
    setCollapsed(!collapsed)
  };

  return (
    <Layout style={{minHeight: '100vh'}}>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu theme="dark" mode="inline" selectedKeys={selectedKey} openKeys={openKeys} onOpenChange={onOpenChange} >
          <SubMenu key="goods" icon={<MailOutlined />} title="商品">
            <Menu.Item key="/goods/list" icon={<UserOutlined />}>
              <Link to="/goods/list">商品列表</Link>
            </Menu.Item>
            <Menu.Item key="/goods/add-goods" icon={<VideoCameraOutlined />}>
              <Link to="/goods/add-goods">新增商品</Link>
            </Menu.Item>
          </SubMenu>
          <SubMenu key="user" icon={<MailOutlined />} title="用户">
            <Menu.Item key="/user/list" icon={<UploadOutlined />}>
              <Link to="/user/list">用户列表</Link>
            </Menu.Item>
          </SubMenu>
        </Menu>
      </Sider>
      <Layout className="site-layout">
        <Header className="site-layout-background" style={{ padding: 0 }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: toggle,
          })}
        </Header>
        <Content
          className="site-layout-background"
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
          }}
        >
          {/* { this.props.children } */}
          <Outlet/>
        </Content>
      </Layout>
    </Layout>
  )
}

export default App;
