import React from 'react';
import './Header.css'
import { NavLink } from 'react-router-dom';

interface IProps {

}

interface IState {
  isLogin: boolean;
  page: string;
}

type links = { page: string, link: string }


class Header extends React.Component<IProps, IState>{
  state: IState = { isLogin: false, page: '首页' };
  pageList: Array<links> = [
    { page: "首页", link: "/" },
    { page: "新闻", link: "/news" },
    { page: "基金", link: "/funds" },
    { page: "股票", link: "/stock" },
    { page: "外汇", link: "/foreignExchangeContainer" }
  ];
  render() {
    return (
      <div id="header">
        {this.state.isLogin ? (<div></div>) :
          (
            <ul id="userList">
              <li className="userItem" id="log">登录</li>
              <li className="userItem" id="reg">注册</li>
            </ul>
          )
        }
        <ul id="menuList">
          {this.pageList.map((link) => {
            return (
              <li
                key={link.page}
                className={this.state.page === link.page ? "menuItemSelected" : "menuItem"}
              >
                <NavLink to={link.link}
                  onClick={this.changePage}
                  style={{ color: 'white' }}>
                  {link.page}
                </NavLink>
              </li>
            )
          })}
        </ul>
      </div>
    )
  }

  changeUserState = (): void => {
    console.log(this.state)
    this.setState({ isLogin: !this.state.isLogin });
  }

  changePage = (e: any): void => {
    console.log(e.target)
    this.setState({ page: e.target.innerHTML })
  }

}

export default Header