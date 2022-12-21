import React, { useEffect, useState } from 'react'
import "./index.scss"
import { Button, Form, Input, Modal } from 'antd';
import { getCode, register } from '../../http/api';
import { Column } from 'rc-table';

type Props = {}


/**
 * 注册页面
 * @param param0 
 * @returns 
 */
export default function MyFundRegister({}: Props) {
  const  [open, setOpen] = useState<boolean>(false);
  const [picCode, setPicCode] = useState<string>("");
  
  const onFinish = async (values: any) => {
    console.log('Received values of form: ', values);
    register(values).then((res:any)=>{
      res ? setOpen(false) : setOpen(true);
    });
  };

  /**
   * 修改图片验证码
   */
  const setCode = () => {
    getCode().then((res:any)=>{
      setPicCode(res);
    });
  }

  useEffect(()=>{
    setCode();
  },[open]);
  
  return (
    <>
    <li className="userItem" id="log" onClick={()=>{
        setOpen(true);
      }}  >
        注册
    </li>
    <Modal
        title="注册"
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
            rules={[{ required: true, message: 'Please input your password2!' }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="Password2"
            name="password2"
            rules={[{ required: true, message: 'Please input your password2!' }]}
          >
            <Input.Password />
          </Form.Item>
          
          <Form.Item
            label="code"
            name="code"
            rules={[{ required: true, message: 'Please input your password2!' }]}
          >
            <div >
            <Input style={{width:"100px"}} />
            <img src={`data:image/png;base64,${picCode}`} onClick={setCode} style={{
              width:"120px", 
              // height:"30px",
              cursor: "pointer",
              
              }} ></img>
            </div>
            
          </Form.Item>
          
          <Form.Item wrapperCol={{ offset: 9, span: 16 }}>
            <Button type="primary" htmlType="submit">
              注册
            </Button>
          </Form.Item>
        </Form>

      </Modal>
    </>
  )
}