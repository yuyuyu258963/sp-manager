import { StoreDataType } from "./interface";


const initialState: StoreDataType = {
  userName: "",
  isLoading: false,
}


/**
 * 处理逻辑编写
 * @param state 
 * @param action 
 * @returns 
 */
const reducer = (state = initialState, action:any) => {
  const {type, data} = action;
  switch (type) {
    

    default:
      return state;
  }


}