// import { Divider } from 'antd';
import React from 'react';
import './DefaultContainer.css'
import axios from 'axios';
interface IProps {

}

interface IState {

}

type fund = {
  id:string;
  name:string;
  rate:string;
}

class DefaultContainer extends React.Component<IProps, IState>{
  data: fund[] = [{id:"010052",name:"长城久嘉创新成长混合C",rate:"-0.0544"}, 
  {id:"001816",name:"汇添富新睿精选混合A",rate:"-0.0429"}, 
  {id:"006025",name:"诺安优化配置混合",rate:"-0.0400"}]


  render() {
    return (
      <div id="defaultContainer">
        <img className="defaultContainer-img" src={require(`../../resource/images/image5.jpg`)} alt={"image1"} />
        <div className="defaultContainer-info">
          {
            this.data.map((found, index) => {
              return (
                <div className="defaultContainer-infoItem" key={index}>
                  <div className="defaultContainer-infoItem-title">
                    <h2>{found.name}</h2>
                    <p>{found.id}</p>
                  </div>
                  <div className="defaultContainer-infoItem-rate">
                    <h1 style={Number(found.rate) > 0 ? { "color": "red" } : { "color": "green" }}>{found.rate}{Number(found.rate) > 0 ? "↑" : "↓"}</h1>
                  </div>
                </div>
              )
            })
          }
        </div>
      </div>
    )
  }
}

export default DefaultContainer