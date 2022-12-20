import React from 'react';
import { Route, Routes } from 'react-router-dom';
import DefaultContainer from './DefaultContainer/DefaultContainer'
import NewsContainer from './NewsContainer/NewsContainer'
import FundsContainer from './FundsContainer/FundsContainer'
import StockContainer from './StockContainer/StockContainer'
import ForeignExchangeContainer from './ForeignExchangeContainer/ForeignExchangeContainer'
import { MyFundLogin, MyFundRegister } from '../Users';


interface IProps {

}

interface IState {

}

class MainContainer extends React.Component<IProps, IState>{
  render() {
    return (
      <div id="mainContainer">
        <Routes>
          <Route path="/" element={<DefaultContainer/>}></Route>
          <Route path="/news" element={<NewsContainer/>}></Route>
          <Route path="/funds" element={<FundsContainer/>}></Route>
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