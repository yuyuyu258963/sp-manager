// import { Divider } from 'antd';
import React from 'react';
import './DefaultContainer.css'
interface IProps {

}

interface IState {

}

interface FoundAndStock {
  id: number;
  name: string;
  rate: number;
}

class DefaultContainer extends React.Component<IProps, IState>{
  data: FoundAndStock[] = [{ id: 1, name: "Found1", rate: 2.3 },
  { id: 2, name: "Found2", rate: 1.6 },
  { id: 3, name: "Found3", rate: -1.2 }];
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
                    <p>{found.name}</p>
                  </div>
                  <div className="defaultContainer-infoItem-rate">
                    <h1 style={found.rate>0?{"color":"red"}:{"color":"green"}}>{found.rate}{found.rate>0?"↑":"↓"}</h1>
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