import { USERLOGIN, USERREGISTER } from "./constant";

/**
 * 用户登录效果
 * @param data 
 * @returns 
 */
export const userLogin = (data:any) => ({type: USERLOGIN, data});


/**
 * 用户注册
 * @param data 
 * @returns 
 */
export const userRegister = (data:any) => ({type: USERREGISTER, data});


