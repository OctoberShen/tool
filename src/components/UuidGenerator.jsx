import React, { useState } from 'react';
import { Card, Input, Button, Typography, Space, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';

const { Title } = Typography;

function UuidGenerator() {
  const [count, setCount] = useState(1);
  const [uuids, setUuids] = useState([]);

  const generateUuids = () => {
    const num = parseInt(count);
    if (isNaN(num) || num <= 0) {
      return;
    }
    // 使用 uuidv4 生成 UUID
    const generatedUuids = Array.from({ length: num }, () => 
      uuidv4().replace(/-/g, '')
    );
    setUuids(generatedUuids);
  };

  const copyToClipboard = (text) => {
    // 创建一个可见的输入框，这样在移动设备上也能工作
    const input = document.createElement('input');
    input.style.position = 'fixed';
    input.style.opacity = 0;
    input.value = text;
    document.body.appendChild(input);
    
    // 选择文本
    input.focus();
    input.select();
    
    try {
      // 尝试使用document.execCommand
      const successful = document.execCommand('copy');
      if (successful) {
        message.success('已复制到剪贴板');
      } else {
        // 如果execCommand失败，尝试使用clipboard API
        navigator.clipboard.writeText(text)
          .then(() => message.success('已复制到剪贴板'))
          .catch(() => message.error('复制失败，请手动复制'));
      }
    } catch (err) {
      message.error('复制失败，请手动复制');
      // 如果都失败了，至少让用户能看到文本并手动复制
      input.style.opacity = 1;
      setTimeout(() => {
        input.style.opacity = 0;
        document.body.removeChild(input);
      }, 3000);
    }
    
    // 移除临时元素
    document.body.removeChild(input);
  };

  return (
    <div className="tool-container">
      <Title level={3} className="tool-title">UUID生成器</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <Space>
          <Input
            type="number"
            value={count}
            onChange={(e) => setCount(e.target.value)}
            style={{ width: 200 }}
            placeholder="请输入需要生成的UUID数量"
          />
          <Button type="primary" onClick={generateUuids}>生成</Button>
        </Space>
        <div className="result-area">
          {uuids.map((uuid, index) => (
            <Card
              key={index}
              size="small"
              style={{ marginBottom: 8 }}
              extra={
                <Button
                  type="text"
                  icon={<CopyOutlined />}
                  onClick={() => copyToClipboard(uuid)}
                />
              }
            >
              {uuid}
            </Card>
          ))}
        </div>
      </Space>
    </div>
  );
}

export default UuidGenerator;