import React, { useState } from 'react';
import { Input, Button, Typography, Space, message } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

const { Title } = Typography;
const { TextArea } = Input;

function NumberConverter() {
  const [input, setInput] = useState('');
  const [result, setResult] = useState('');

  const handleConvert = () => {
    const numbers = input
      .split('\n')
      .map(line => line.trim())
      .filter(line => line && /^\d+$/.test(line));

    if (numbers.length === 0) {
      message.warning('请输入有效的数字，每行一个');
      return;
    }

    setResult(numbers.join(','));
  };

  const handleCopy = () => {
    if (result) {
      // 创建一个临时输入框
      const input = document.createElement('input');
      input.style.position = 'fixed';
      input.style.opacity = 0;
      input.value = result;
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
          navigator.clipboard.writeText(result)
            .then(() => message.success('已复制到剪贴板'))
            .catch(() => message.error('复制失败，请手动复制'));
        }
      } catch (err) {
        message.error('复制失败，请手动复制');
      } finally {
        // 移除临时元素
        document.body.removeChild(input);
      }
    }
  };

  return (
    <div className="tool-container">
      <Title level={3} className="tool-title">in 参数转换</Title>
      <Space direction="vertical" style={{ width: '100%' }}>
        <TextArea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="请输入数字，每行一个"
          autoSize={{ minRows: 6, maxRows: 12 }}
          style={{ fontSize: '16px' }}
        />
        <Space>
          <Button type="primary" onClick={handleConvert}>转换</Button>
          <Button 
            icon={<CopyOutlined />} 
            onClick={handleCopy} 
            disabled={!result}
            size="large"
          />
        </Space>
        {result && (
          <div className="result-area">
            {result}
          </div>
        )}
      </Space>
    </div>
  );
}

export default NumberConverter;