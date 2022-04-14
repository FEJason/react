import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Form, Input, Button, message } from 'antd'
import { login } from '../../api/login'
import './login.scss'

function Login() {
  const navigate = useNavigate()
  /* 提交表单且数据验证成功后回调事件 */
  const onFinish = (values) => {
    console.log('Success:', values);
    login(values).then(res => {
      localStorage.userInfo = JSON.stringify(res)
      localStorage.token = res.jwt
      message.success('登录成功')
      navigate(`/`)
    })
  };
  /* 提交表单且数据验证失败后回调事件 */
  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };
  return (
    <div className="page-wrap">
      <Form
        className="form-wrap"
        size="large"
        name="basic"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <div className="title">登录</div>
        <Form.Item
          name="cnum"
          initialValue="600377"
          rules={[{ required: true, message: '请输入账号' }]}
        >
          <Input placeholder="请输入账号"/>
        </Form.Item>

        <Form.Item
          name="pwd"
          initialValue="123456"
          rules={[{ required: true, message: '请输入密码' }]}
        >
          <Input.Password placeholder="请输入密码" />
        </Form.Item>

        {/* <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

        <Form.Item>
          <Button type="primary" htmlType="submit" block>
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default Login
