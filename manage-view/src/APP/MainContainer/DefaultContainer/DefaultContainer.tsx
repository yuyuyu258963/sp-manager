// import { Divider } from 'antd';
import React from 'react';
import './DefaultContainer.css'
interface IProps {

}

interface IState {
  imageName:Array<string>
}

class DefaultContainer extends React.Component<IProps, IState>{
  state: IState= {imageName:['image1','image2','image3']}
  render() {
    return (
      <div id="defaultContainer">
        <div id='introductionContainer'>
          {this.state.imageName.map((image: string,index:number) =>{
            return (
            <div className="introduction" key={index}>
              <img className="img" src={require(`../../resource/images/${image}.jpg`)} alt={image} />
              <div className="description">
                <div>天天理财</div>
              </div>
            </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default DefaultContainer