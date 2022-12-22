import React, { useState } from 'react'
import './FundsDetail.css'
import { useLocation } from 'react-router-dom';
import * as echarts from 'echarts';
import { Button, Col, Row } from 'antd';
import axios from 'axios';

type fund = {
  "_id": string,
  "基金全称": string,
  "基金类型": string,
  "基金经理": string,
  "成立日期": string,
  "成立规模": string,
  "份额规模": string,
  "首次最低金额": string,
  "托管费": string,
  "基金管理人": string,
  "最高认购费": string,
  "最高申购费": string,
  "最高赎回费": string
}
export default function FundsDetail() {
  let location = useLocation();
  const [fundsRateData, setFundsData] = useState([])
  const fundID: string = location.pathname.split('/').reverse()[0];
  const BaseUrl = "http://127.0.0.1:5590/";
  
  axios({
    method: "post",
    url: `${BaseUrl}trend/net`,
    timeout: 50000,
    // url: "/api/trend/net",
    data: JSON.stringify({ "_id": fundID }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(function (response) {
    //handle success data
    setFundsData(response.data)
  })
    .catch(function (error) {
      //handle error satuation
      console.log(error)
    })

  const [rankData, setRankData] = useState([])

  axios({
    method: "post",
    url: `${BaseUrl}rank`,
    timeout: 50000,
    // url: "/api/rank",
    data: JSON.stringify({ "_id": fundID }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(function (response) {
    //handle success data
    setRankData(response.data)
  })
    .catch(function (error) {
      //handle error satuation
      console.log(error)
    })

  const [fund, setFund] = useState<fund>({
    "_id": '',
    "基金全称": '',
    "基金类型": '',
    "基金经理": '',
    "成立日期": '',
    "成立规模": '',
    "份额规模": '',
    "首次最低金额": '',
    "托管费": '',
    "基金管理人": '',
    "最高认购费": '',
    "最高申购费": '',
    "最高赎回费": ''
  })
  axios({
    method: "post",
    url: `${BaseUrl}show/single`,
    // url: "/api/show/single",
    data: JSON.stringify({ "_id": fundID }),
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  }).then(function (response) {
    //handle success data
    setFund(response.data[0]);
  })
    .catch(function (error) {
      //handle error satuation
      console.log(error)
    })

  // [ ['2022-09-15', [['3434', '6085', '43.57'], ['321', '7078', '95.46'], ['361', '6994', '94.84'], ['1730', '6795', '74.54'], ['4986', '6473', '22.97'], ['2685', '5512', '51.29'], [], ['2116', '3801', '44.33'], ['1635', '2986', '45.24'], ['611', '2133', '71.35']]]]

  const timeData_top = fundsRateData.map((founds: any[]) => { return founds[0] })
  const rateData_top = fundsRateData.map((founds: any[]) => { return founds[1] })

  const timeData_bottom: any = [];
  const rateData_bottom: any = [];
  for (let i = 0; i < 10; i++) {
    timeData_bottom.push(rankData.filter((data: any) => { return data[1][i].length > 0 }).map((ranks: any[]) => { return ranks[0] }))
    rateData_bottom.push(rankData.map((ranks: any[]) => { return ranks[1][i] }))
  }
  function drawPicture_top() {
    type EChartsOption = echarts.EChartsOption;
    var chartDom = document.getElementById('picture_top')!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
      title: {
        show: true,
        text: "净值",
      },
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
      legend: {
        show: true,
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
          name: "净值",
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
      title: {
        show: true,
        text: "收益排名变化",
      },
      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: timeData_bottom[0].reverse()
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
      legend: {
        show: true,
      },
      tooltip: {//提示框组件
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          label: {
            backgroundColor: '#6a7985'
          }
        },
        formatter: `{b}<br/> 收益排名: <span><font color="fba81a">{c}%</font></span>`
      },
      series: [
        {
          name: "收益排名",
          data: rateData_bottom[0].filter((rate: any) => { return rate.length > 0; }).map((rate: any) => { return rate[2] }).reverse(),
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
  }, [rankData, fundsRateData, fund])

  return (
    <div id='FundsDetail'>
      <div className='BaseData'>
        <div className='BaseDataTitle'>
          <h1 className='FundsName'>{fund.基金全称}</h1>&nbsp;&nbsp;
          <span className='FundsID'>{fund._id}</span>&nbsp;&nbsp;
          {/* <span className='FoundTips'>&nbsp;&nbsp; FoundTips &nbsp;&nbsp;</span>&nbsp;&nbsp;
          <span className='FoundRisks'>&nbsp;&nbsp; FoundRisks &nbsp;&nbsp;</span>&nbsp;&nbsp; */}
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
                      <b className={rateData_top[rateData_top.length-1]-rateData_top[rateData_top.length-2]>=0?"percent-up":"percent-down"}>
                        {rateData_top[rateData_top.length-1]}<span>%</span>
                      </b>
                      <div className={rateData_top[rateData_top.length-1]-rateData_top[rateData_top.length-2]>=0?"increase-up":"increase-down"}>{(rateData_top[rateData_top.length-1]-rateData_top[rateData_top.length-2]).toFixed(3)}</div>
                    </p>
                    <p className="key">单位净值[12-20]</p>
                  </div>
                  <div className='d-wfsy'>
                    <p className="value">
                      <b className={rateData_top[rateData_top.length-1]-rateData_top[rateData_top.length-2]>=0?"percent-up":"percent-down"}>
                        {rateData_top[rateData_top.length-1]}<span>%</span>
                      </b>
                    </p>
                    <p className="key">累计净值[12-20]</p>
                  </div>
                  <ul className='data-display-rate-list'>
                    <li className="data-display-rate-list-item">托管费：<span className="sp-rate">{fund.托管费}</span></li>
                    <li className="data-display-rate-list-item">最高认购费：<span className="sp-rate">{fund.最高认购费}</span></li>
                    <li className="data-display-rate-list-item">最高申购费：<span className="sp-rate">{fund.最高申购费}</span></li>
                    <li className="data-display-rate-list-item">最高赎回费：<span className="sp-rate">{fund.最高赎回费}</span></li>
                  </ul>
                </div>
                <ul className='data-display-bottom'>
                  <li className="data-display-bottom-item">基金规模: <span className="found-detail">{fund.份额规模}</span></li>
                  <li className="data-display-bottom-item">成立时间: <span className="found-detail">{fund.成立日期}</span></li>
                  <li className="data-display-bottom-item">基金经理: <span className="found-detail">{fund.基金经理}</span></li>
                  <li className="data-display-bottom-item">基金类型: <span className="found-detail">{fund.基金类型}</span></li>
                  <li className="data-display-bottom-item">管理人:   <span className="found-detail">{fund.基金管理人}</span></li>
                </ul>
              </div>
              <div className="buy">
                <div className="im-state">
                  <p className="buy-item">申购状态：开放</p><p className="buy-item">赎回状态：开放</p>
                </div>
                <div className="tips">
                  <p className="buy-item">费率: <span className="cost">{fund.托管费}</span></p>
                  <p className="buy-item"><span className="tips-i">按日计息</span></p>
                </div>
              </div>
              <a href={`https://fund.10jqka.com.cn/${fundID}/`}><Button type="primary">点此购买</Button></a>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  )
}


