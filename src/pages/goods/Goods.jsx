import React, { useState, useEffect } from "react";
import { Form, Input, Button, Select } from "antd";

const { Option } = Select;

function Goods() {
  const [form] = Form.useForm();
  const [, forceUpdate] = useState({}); // To disable submit button at the beginning.

  useEffect(() => {
    forceUpdate({});
  }, []);

  const onFinish = (values) => {
    console.log("Finish:", values);
  };

  const handleReset = () => {
    console.log('重置')
  }

  const onCodeChange = (value) => {
    console.log(value)
  }

  const onStatusChange = (value) => {
    console.log(value)
  }

  return (
    <div>
      <div className="page-top">
        <Form
          form={form}
          name="horizontal_login"
          onFinish={onFinish}
          labelCol={{span: 10, offset: 0}}
          wrapperCol={{span: 12, offset: 0}}
        >
          <div className="u-flex">
            <Form.Item name="name" label="商品名称">
              <Input placeholder="商品名称" style={{width: '120px'}}/>
            </Form.Item>
            <Form.Item name="productSno" label="商品编码">
              <Input placeholder="商品编码" style={{width: '120px'}}/>
            </Form.Item>
            <Form.Item name="categoryCode" label="商品分类">
              <Select
                style={{width: '120px'}}
                placeholder="商品分类"
                onChange={onCodeChange}
                allowClear
              >
                <Option value="male">male</Option>
                <Option value="female">female</Option>
                <Option value="other">other</Option>
              </Select>
            </Form.Item>
            <Form.Item name="shelfStatus" label="商品状态">
              <Select
                style={{width: '120px'}}
                placeholder="商品状态"
                onChange={onStatusChange}
                allowClear
              >
                <Option value="1">上架</Option>
                <Option value="0">下架</Option>
              </Select>
            </Form.Item>
          </div>
          <div className="u-flex">
            <Form.Item shouldUpdate>
              {() => (
                <Button type="primary" htmlType="submit">
                  查询搜索
                </Button>
              )}
            </Form.Item>
            <Form.Item shouldUpdate className="u-m-l-10">
              {() => (
                <Button onClick={handleReset}>
                  重置搜索
                </Button>
              )}
            </Form.Item>
          </div>
        </Form>
      </div>
      <div className="page-con"></div>
    </div>
  );
}

export default Goods;
