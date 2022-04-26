import React, {useState} from 'react';
import { Layout, Menu } from 'antd';
import { TeamOutlined, FireOutlined } from '@ant-design/icons';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Customers from './components/Customers';
import Activities from './components/Activities';
import 'antd/dist/antd.css';


function App() {
  const [collapsed, setCollapsed] = useState<boolean>(false);

  const onCollapse = (collapsed: boolean): void => {
    setCollapsed(collapsed);
  }

  const { Sider, Content } = Layout;

  return (
    <div>
      <Router>
        <Layout style={{ minHeight: '100vh'}}>
          <Sider collapsible collapsed={collapsed} onCollapse={onCollapse}>
            <div className="logo" />
            <Menu theme="dark" defaultSelectedKeys={['0']} mode="inline">
              <Menu.Item key="1" icon={<TeamOutlined />} title={null}>
                <Link to="/customers">
                  Customers
                </Link>
              </Menu.Item>
              <Menu.Item key="2" icon={<FireOutlined />} title={null}>
                <Link to="/activities">
                  Training Activities
                </Link>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout className="site-layout">
            <Content style={{marginTop: 10, marginLeft: 15}}>
              <Routes>
                <Route path="/" element={<Customers />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/activities" element={<Activities />} />
              </Routes>
            </Content>
          </Layout>
        </Layout>
      </Router>
    </div>
  );
}

export default App;
