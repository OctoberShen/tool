import React, { useState } from 'react';
import { Layout, Menu, Typography } from 'antd';
import { ToolOutlined } from '@ant-design/icons';
import UuidGenerator from './components/UuidGenerator';
import NumberConverter from './components/NumberConverter';

const { Header, Content } = Layout;
const { Title } = Typography;

const tools = [
  { key: 'uuid', label: 'UUID生成器', icon: <ToolOutlined />, component: UuidGenerator },
  { key: 'converter', label: 'In 参数转换', icon: <ToolOutlined />, component: NumberConverter },
];

function App() {
  const [currentTool, setCurrentTool] = useState('uuid');

  const CurrentComponent = tools.find(tool => tool.key === currentTool)?.component;

  return (
    <Layout className="layout" style={{ minHeight: '100vh' }}>
      <Header style={{ background: '#fff', borderBottom: '1px solid #f0f0f0' }}>
        <div style={{ float: 'left', marginRight: '24px' }}>
          <Title level={4} style={{ margin: '16px 0' }}>工具集</Title>
        </div>
        <Menu
          mode="horizontal"
          selectedKeys={[currentTool]}
          items={tools}
          onClick={({ key }) => setCurrentTool(key)}
          style={{ background: 'transparent' }}
        />
      </Header>
      <Content className="container">
        {CurrentComponent && <CurrentComponent />}
      </Content>
    </Layout>
  );
}

export default App;