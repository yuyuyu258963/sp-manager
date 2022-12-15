import { Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import React, { ReactElement } from 'react';
import './FundsContainer.css'

interface IProps {

}

interface IState {

}

interface DataType {
  key: React.Key;
  name: string;
  rate: string;
  timeLimit: string;
  progress:ReactElement;
  amount:string;
  operation:ReactElement;
}


const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
  console.log('params', pagination, filters, sorter, extra);
};

class FundsContainer extends React.Component<IProps, IState>{

  columns: ColumnsType<DataType> = [
    {
      title: '名称',
      dataIndex: 'name',
    },
    {
      title: '年化收益',
      dataIndex: 'rate',
    },
    {
      title: '期限',
      dataIndex: 'timeLimit',
    },{
      title: '进度',
      dataIndex: 'progress',
    },{
      title: '金额',
      dataIndex: 'amount',
    },{
      title: '操作',
      dataIndex: 'operation',
    }
  ]

  data = [
    {
      key: '1',
      name: '定存冠',
      rate: '6.70%',
      timeLimit: '2 个月',
      progress:<div><progress value={75} max={100}></progress>75%</div>,
      amount:'$0',
      operation:<button>预订</button>
    },{
      key: '2',
      name: '定存冠',
      rate: '6.70%',
      timeLimit: '2 个月',
      progress:<div><progress value={75} max={100}></progress>75%</div>,
      amount:'$0',
      operation:<button>预订</button>
    },{
      key: '3',
      name: '定存冠',
      rate: '6.70%',
      timeLimit: '2 个月',
      progress:<div><progress value={75} max={100}></progress>75%</div>,
      amount:'$0',
      operation:<button>预订</button>
    },{
      key: '4',
      name: '定存冠',
      rate: '6.70%',
      timeLimit: '2 个月',
      progress:<div><progress value={75} max={100}></progress>75%</div>,
      amount:'$0',
      operation:<button>预订</button>
    },{
      key: '5',
      name: '定存冠',
      rate: '6.70%',
      timeLimit: '2 个月',
      progress:<div><progress value={75} max={100}></progress>75%</div>,
      amount:'$0',
      operation:<button>预订</button>
    }
  ];

  render() {
    return (
      <div id="fundsContainer">
        <Table columns={this.columns} dataSource={this.data} onChange={onChange} />
      </div>
    );
  }
};

export default FundsContainer;