import React, { useState } from 'react'

import "./index.scss"
import { Button, Checkbox, Form, Input, Modal } from 'antd'
import { NavLink } from 'react-router-dom';
import { Login } from '../../http/api';
import { async } from 'q';
type Props = {}

/**
 * 登录页面
 * @param param0 
 * @returns 
 */
export default function MyFundLogin({}: Props) {
  const  [open, setOpen] = useState<boolean>(false);
  
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    Login(values).then((res:any)=>{
      res ? setOpen(false) : setOpen(true);
    });
  };
  
  
  return (
    <>
    <li className="userItem" id="log" onClick={()=>{
        setOpen(true);
      }}  >
        登录
    </li>
    <Modal
        title="登录"
        centered
        open={open}
        footer ={
          []
        }
        onOk={() => setOpen(false)}
        onCancel={() => setOpen(false)}
        width={400}
      >
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          // onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: 'Please input your username!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: 'Please input your password!' }]}
          >
            <Input.Password />
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
            <Button type="primary" htmlType="submit">
              登录
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  )
}