import React, { useState }from 'react'
import './FundsDetail.css'
import { useLocation } from 'react-router-dom';
import * as echarts from 'echarts';
// import fundsData from "../../resource/data/foundsData.json"
import { Button, Col, Row } from 'antd';
import axios from 'axios';


export default function FundsDetail() {
  let location = useLocation();
  const [fundsData,setFundsData] = useState([])
  // http://121.4.249.181:5590/


  // {
  //   "_id": "001706",
  //   "fund_code": "001706",
  //   "netVal_path": {"2016-09-22": 1.0, "2016-09-23": 1.0, "2016-09-26": 1.0, "2016-09-27": 1.0, "2016-09-28": 1.0, "2016-09-29": 1.0, "2016-09-30": 1.0, "2016-10-10": 1.001, "2016-10-11": 1.001}
  //     }
  const foundID: string = location.pathname.split('/').reverse()[0];
  axios({
    method: "post",
    url: "/api/trend/net",
    data: JSON.stringify({"_id": foundID}),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(function (response) {
    //handle success data
    setFundsData(response.data)
    console.log(fundsData)
  })
    .catch(function (error) {
      //handle error satuation
      console.log(error)
    })
  
  // let rankData:any = []
  // axios({
  //   method: "post",
  //   url: "/api/rank",
  //   data: JSON.stringify({"_id": foundID}),
  //   headers: {
  //     'Content-Type': 'application/json;charset=UTF-8'
  //   }
  // }).then(function (response) {
  //   //handle success data
  //   console.log(response.data)
  //   rankData = response.data
  //   console.log(fundsData)
  // })
  //   .catch(function (error) {
  //     //handle error satuation
  //     console.log(error)
  //   })


  
  const timeData_top = fundsData.map((founds: any[]) => { return founds[0] })
  const rateData_top = fundsData.map((founds: any[]) => { return founds[1] })
  console.log(timeData_top,rateData_top)
  // 然后净值的形式能不能做成列表 [[time,data],[time,data]]这样
  function drawPicture_top() {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('picture_top')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeData_top
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#f54482',
          formatter: function (value: any) {
            return `${value.toString()}.00%`
          }
        },
      },
      tooltip: {//提示框组件
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: `{b}<br/> 净值: <span><font color="fba81a">{c}%</font></span>`
      },
      series: [
        {
          data: rateData_top,
          type: 'line',
          areaStyle: {
            color: "#ecf3fa"
          },
          itemStyle: {
            color: "#4489ca",
          },
        }
      ]
    };
    option && myChart.setOption(option);
  }

  function drawPicture_bottom() {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('picture_bottom')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeData_top
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#f54482',
          formatter: function (value: any) {
            return `${value.toString()}.00%`
          }
        },
      },
      tooltip: {//提示框组件
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: `{b}<br/> 净值: <span><font color="fba81a">{c}%</font></span>`
      },
      series: [
        {
          data: rateData_top,
          type: 'line',
          areaStyle: {
            color: "#ecf3fa"
          },
          itemStyle: {
            color: "#4489ca",
          },
        }
      ]
    };
    option && myChart.setOption(option);
  }

  React.useEffect(() => {
    drawPicture_top()
    drawPicture_bottom()
  }, [fundsData])

  return (
    <div id='FundsDetail'>
      <div className='BaseData'>
        <div className='BaseDataTitle'>
          <h1 className='FundsName'>FundsName</h1>&nbsp;&nbsp;
          <span>{foundID}</span>&nbsp;&nbsp;
          <span className='FoundTips'>&nbsp;&nbsp; FoundTips &nbsp;&nbsp;</span>&nbsp;&nbsp;
          <span className='FoundRisks'>&nbsp;&nbsp; FoundRisks &nbsp;&nbsp;</span>&nbsp;&nbsp;
        </div>
        <div className='BaseDataContainer'>
          <Row>
            <Col span={12}>
              <div className='cartogram'>
                <div id='picture_top'>
                </div>
                <div id='picture_bottom'>
                </div>
              </div>
            </Col>
            <Col span={12}>
              <div className='data-display'>
                <div className='data-display-top'>
                  <div className='d-wfsy'>
                    <p className="value">
                      <b className="percent">
                        {rateData_top.reverse()[0]}<span>%</span>
                      </b>
                    </p>
                    <p className="key">七日年化[12-19]</p>
                  </div>
                  <div className='d-wfsy'>
                    <p className="value">
                      <b className="percent">
                        {rateData_top.reverse()[0]}<span>%</span>
                      </b>
                    </p>
                    <p className="key">七日年化[12-19]</p>
                  </div>
                  <ul className='data-display-rate-list'>
                    <li className="data-display-rate-list-item">近1月: <span className="sp-rate">0.14%</span></li>
                    <li className="data-display-rate-list-item">近3月: <span className="sp-rate">0.35%</span></li>
                    <li className="data-display-rate-list-item">近6月: <span className="sp-rate">0.73%</span></li>
                    <li className="data-display-rate-list-item">近1年: <span className="sp-rate">1.70%</span></li>
                  </ul>
                </div>
                <ul className='data-display-bottom'>
                  <li className="data-display-bottom-item">基金规模: <span className="found-detail">32.63亿元</span></li>
                  <li className="data-display-bottom-item">成立时间: <span className="found-detail">2017-08-03</span></li>
                  <li className="data-display-bottom-item">基金经理: <span className="found-detail">邱骏</span></li>
                  <li className="data-display-bottom-item">基金评级: <span className="found-detail">暂无评级</span></li>
                  <li className="data-display-bottom-item">管理人:   <span className="found-detail">红土创新基金管理有限公司</span></li>
                </ul>
              </div>
              <div className="buy">
                <div className="im-state">
                  <p className="buy-item">申购状态：开放</p><p className="buy-item">赎回状态：开放</p>
                </div>
                <div className="tips">
                  <p className="buy-item">费率: <span className="cost">0.00%</span></p>
                  <p className="buy-item"><span className="tips-i">按日计息</span></p>
                </div>
              </div>
              <a href={`https://fund.10jqka.com.cn/${foundID}/`}><Button type="primary">点此购买</Button></a>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}



// class FundsDetail extends React.Component<IProps, IState> {

//   navigation = useNavigate();

//   componentDidMount(){
//     console.log("match",this.navigation);

// }

//   render() {
//     return (
//       <div id='FundsDetail'>
//         <div className='BaseData'>
//           <div className='BaseDataTitle'>

//             <h1>FundsName</h1>
//             <span>FoundCode</span>
//             <span>FoundTips</span>
//             <span>FoundRisks</span>
//           <div className="ti-right"><span>加自选</span></div>
//           </div>
//           <div className='BaseDataContainer'>
//             <div className='cartogram'>
//               <div className=''></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

// export default FundsDetail