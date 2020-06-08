import React, {Component} from 'react'
import 'antd/dist/antd.css'
import DataList from './data-list'
import { Layout, Menu } from 'antd'
import {
  AppstoreOutlined
} from '@ant-design/icons'

const { Content, Footer, Sider } = Layout
const { SubMenu } = Menu

export default class Dashboard extends Component {
  state = {
    collapsed: false,
  }

  onCollapse = collapsed => {
    this.setState({ collapsed })
  }

  handleClick(e) {
    console.log('click', e)
  }

  render() {
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider collapsible collapsed={this.state.collapsed} onCollapse={this.onCollapse}>
          {/* <div className="logo" /> */}
          <Menu theme="dark" mode="vertical">
            <SubMenu key="sub1" icon={<AppstoreOutlined />} title="Pengaturan Pengguna">
              <Menu.Item key="1">Menu</Menu.Item>
              <SubMenu key="sub2" title="Role Manager">
                <Menu.Item key="4">Hierarchy Structure</Menu.Item>
                <Menu.Item key="5">Group Permission</Menu.Item>
                <Menu.Item key="6">User Access</Menu.Item>
              </SubMenu>
            </SubMenu>
          </Menu>
          
        </Sider>
        <Layout className="site-layout">
          {/* <Header className="site-layout-background" style={{ padding: 0 }} /> */}
          <Content style={{ margin: '0 16px' }}>
            <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
              <DataList />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
        </Layout>
      </Layout>
    )
  }
}
