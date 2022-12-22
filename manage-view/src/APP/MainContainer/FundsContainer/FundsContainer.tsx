import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { ReactElement } from 'react';
import './FundsContainer.css'
import { Link } from 'react-router-dom';
import axios from 'axios';

type fund = {
  "_id": string,
  "基金全称": ReactElement,
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

interface IProps {

}

interface IState {
  data: fund[]
}



interface DataType {
  _id: string,
  基金全称: ReactElement,
  基金类型: string,
  基金经理: string,
  成立日期: string,
  成立规模: string,
  份额规模: string,
  首次最低金额: string,
  托管费: string,
  基金管理人: string,
  最高认购费: string,
  最高申购费: string,
  最高赎回费: string
}


const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

class FundsContainer extends React.Component<IProps, IState>{

  // constructor(props: IProps){
  //   super(props);
  //   this.state = {
  //     data:[]
  //   }
  // }

  state: Readonly<IState> = { data: [] };

  componentDidMount(): void {
    const BaseUrl = "http://127.0.0.1:5590/";
    
    let _this = this;
    axios(
      {
        method: "post",
        url: `${BaseUrl}show`,
        // url: '/api/show',
        timeout: 50000,
        // headers: {
        //   'Content-Type': '*',
        //   'Access-Control-Allow-Origin': "*",
        // },
      }
    )
      .then(function (response) {
        //handle success data
        let data: fund[] = response.data.map((fund: fund, index: number) => {
          let link = `/funds/${fund._id}`
          return {
            "_id": fund._id,
            "基金全称": <Link to={link} >{fund.基金全称}</Link>,
            "基金类型": fund.基金类型,
            "基金经理": fund.基金经理,
            "成立日期": fund.成立日期,
            "成立规模": fund.成立规模,
            "份额规模": fund.份额规模,
            "首次最低金额": fund.首次最低金额,
            "托管费": fund.托管费,
            "基金管理人": fund.基金管理人,
            "最高认购费": fund.最高认购费,
            "最高申购费": fund.最高申购费,
            "最高赎回费": fund.最高赎回费
          }
        })
        _this.setState({ data: data })
      })
      .catch(function (error) {
        //handle error satuation
        console.log(error)
      })
  }

  columns: ColumnsType<DataType> = [
    {
      title: 'id',
      dataIndex: '_id',
    },
    {
      title: '基金',
      dataIndex: '基金全称',
    },
    {
      title: '基金类型',
      dataIndex: '基金类型',
    },
    {
      title: '基金经理',
      dataIndex: '基金经理',
    }, {
      title: '成立日期',
      dataIndex: '成立日期',
    }, {
      title: '成立规模',
      dataIndex: '成立规模',
    }, {
      title: '份额规模',
      dataIndex: '份额规模',
    }, {
      title: '首次最低金额（元）',
      dataIndex: '首次最低金额',
    }, {
      title: '托管费',
      dataIndex: '托管费',
    }, {
      title: '基金管理人',
      dataIndex: '基金管理人',
    }, {
      title: '最高认购费',
      dataIndex: '最高认购费',
    }, {
      title: '最高申购费',
      dataIndex: '最高申购费',
    }, {
      title: '最高赎回费',
      dataIndex: '最高赎回费',
    }
  ]



  render() {
    const { data } = this.state;
    return (
      <div id="fundsContainer">
        <Table columns={this.columns} dataSource={data === null ? [] : data} size="small" onChange={onChange} />
      </div>
    );
  }
};

export default FundsContainer;