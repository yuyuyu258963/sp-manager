// @ts-nocheck
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultContainer from './DefaultContainer/DefaultContainer'
import NewsContainer from './NewsContainer/NewsContainer'
import FundsContainer from './FundsContainer/FundsContainer'
import FundsDetail from './FundsContainer/FundsDetail'
import StockContainer from './StockContainer/StockContainer'
import ForeignExchangeContainer from './ForeignExchangeContainer/ForeignExchangeContainer'
import { MyFundLogin, MyFundRegister } from '../Users';


interface IProps {

}

interface IState {

}


const routes = [
  {path:"/", element: <DefaultContainer/> },
  {path:"/news", element: <NewsContainer/> },
  {path:"/funds", element: <FundsContainer/> },
  {path:"/funds/:id", element: <FundsDetail/> },
  {path:"/stock", element: <StockContainer/> },
  {path:"/userLogin", element: <MyFundLogin/> },
  {path:"/userRegister", element: <MyFundRegister/> },
  {path:"/foreignExchangeContainer", element: <ForeignExchangeContainer/> },
];

class MainContainer extends React.Component<IProps, IState>{
  render() {
    return (
      <div id="mainContainer">
        <Routes>
          
          <Route path="/" element={<DefaultContainer/>}></Route>
          <Route path="/news" element={<NewsContainer/>}></Route>
          <Route path="/funds" element={<FundsContainer />}></Route>
          
          <Route path="/funds/:id" element={<FundsDetail />} />
          <Route path="/stock" element={<StockContainer/>}></Route>
          <Route path="/userLogin" element={<MyFundLogin/>}></Route>
          <Route path="/userRegister" element={<MyFundRegister/>}></Route>
          <Route path="/foreignExchangeContainer" element={<ForeignExchangeContainer/>}></Route>
        </Routes>
      </div>
    )
  }
}

export default MainContainer