import { notification } from "antd";
import axios from "axios";

const BaseUrl = "http://121.4.249.181:5590/";

// 进行统一配置
const service = axios.create({
  baseURL: "http:121.4.249.181:5590",
  // 统一设置超时时间
  timeout: 50000,
  // 允许携带cookie
  withCredentials: true,
})



/**
 * 用户登录
 * @param data 
 */
export const Login = async (data:any) => {
  return await axios({
    method: "post",
    url: `${BaseUrl}login`,
    params:data,
    timeout: 50000,
    headers: {
      'Content-Type': '*',
      'Access-Control-Allow-Origin': "*",
    },
  }).then((res:any) => {
    console.dir(res)
    if(res.data.code == 200){
      notification.success({message: "登录成功！"})
      return true;
    } else {
      notification.warning({message: res.data.message})
      return false;
    }
  }).catch((error:any) => {
    console.dir(error);
    notification.error({message:"登录失败"})
    return false;
  })
}

/**
 * 用户注册
 * @param data 
 */
export const register = async (data:any) => {
  return await axios({
    method: "post",
    url: `${BaseUrl}register`,
    params:data,
    timeout: 50000,
    headers: {
      'Content-Type': '*',
      'Access-Control-Allow-Origin': "*",
    },
  }).then((res:any) => {
    console.dir(res)
    if (res.data == 0) {
      notification.success({message: "注册成功"})
      return true;
    } else if (res.data == 2){
      notification.warning({message: "两次密码不一致"})
    }else if (res.data == 3){
      notification.warning({message: "验证码有误"})
    }
    return false;
  }).catch((error:any) => {
    console.dir(error);
    notification.error({message:"注册失败"})
    return false;
  })
  
}


/**
 * 获取验证码
 */
export const getCode = async () => {
  return await  axios({
    method: "post",
    url: `${BaseUrl}code`,
    timeout: 50000,
    headers: {
      'Content-Type': '*',
      'Access-Control-Allow-Origin': "*",
    },
  }).then((res:any) => {
    console.dir(res)
    // notification.success({message: "成功获取验证码"})
    return res.data.img;
  }).catch((error:any) => {
    console.dir(error);
    notification.error({message:"服务器获取验证码失败"})
    return "";
  })
}






