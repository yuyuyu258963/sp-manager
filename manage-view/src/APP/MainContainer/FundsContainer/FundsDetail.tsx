import React, { Component } from 'react'
import './FundsDetail.css'


interface IProps {

}

interface IState {

}

class FundsDetail extends React.Component<IProps, IState> {
  render() {
    return (
      <div id='FundsDetail'>
        <div className='BaseData'>
          <div className='BaseDataTitle'>

            <h1>FundsName</h1>
            <span>FoundCode</span>
            <span>FoundTips</span>
            <span>FoundRisks</span>
          <div className="ti-right"><span>加自选</span></div>
          </div>
          <div className='BaseDataContainer'>
            <div className='cartogram'>
              <div className=''></div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default FundsDetail