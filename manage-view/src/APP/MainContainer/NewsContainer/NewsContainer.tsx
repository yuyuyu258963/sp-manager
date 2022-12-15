import { AppstoreOutlined, MailOutlined, SettingOutlined } from '@ant-design/icons';
import { Col, MenuProps, Row } from 'antd';
import { Menu } from 'antd';
import React from 'react';
import './NewsContainer.css'

type MenuItem = Required<MenuProps>['items'][number];

interface IProps {

}

interface IState {
  newsgroupTitles:string;
}

type news = { newsTitle: string, newsTime: string }


function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}


class NewsContainer extends React.Component<IProps, IState>{
  newsDate: Array<news> = [
    { newsTitle: "title1", newsTime: "time1" },
    { newsTitle: "title2", newsTime: "time2" },
    { newsTitle: "title3", newsTime: "time3" },
    { newsTitle: "title4", newsTime: "time4" },
    { newsTitle: "title5", newsTime: "time5" },
    { newsTitle: "title6", newsTime: "time6" },
    { newsTitle: "title7", newsTime: "time7" },
    { newsTitle: "title8", newsTime: "time8" },
    { newsTitle: "title9", newsTime: "time9" },
    { newsTitle: "title10", newsTime: "time10" }
  ];

  items: MenuProps['items'] = [
    getItem('金融知识', '金融知识', <MailOutlined />),
    getItem('法律法规', '法律法规', <AppstoreOutlined />),
    getItem('常见问题解答', '常见问题解答', <SettingOutlined />),
  ];

  newsgroupTitles:Array<string> =["金融知识","法律法规","常见问题解答"];

  state:IState = {
    newsgroupTitles: "金融知识"
  }

  render() {
    return (
      <div id="newsContainer">
        <Row>
          <Col span={4} offset={3}>
            <Menu
              onClick={this.onClick}
              style={{ width: "100%" }}
              defaultSelectedKeys={['1']}
              defaultOpenKeys={['sub1']}
              mode="inline"
              items={this.items}
            />
          </Col>
          <Col span={12} offset={1}>
            <div id="newsTitleList">
              <div id="newsGroupTitle"><strong>{this.state.newsgroupTitles}</strong></div>
              <ul>
                {this.newsDate.map((news, index) => {
                  return <li className="news" key={index}>
                    <Row>
                      <Col span={18}>
                        <div className="newsTitle">{news.newsTitle}</div>
                      </Col>
                      <Col span={2} offset={2}>
                        <div className="newsTime">{news.newsTime}</div>
                      </Col>
                    </Row>
                  </li>
                })}
              </ul>
            </div>
          </Col>
        </Row>
      </div>
    );
  }

  onClick:MenuProps['onClick'] = ({ key }) => {
    this.setState({newsgroupTitles:key})
    console.log(key)
  };

};

export default NewsContainer;