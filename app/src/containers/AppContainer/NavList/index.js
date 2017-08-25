import React, {
  Component,
  PropTypes
} from 'react';

import {
  IndexLink,
  Link
} from 'react-router';
import { observer } from 'mobx-react';
import { observable,action } from 'mobx';
import ImageNav1 from './assets/tb1.png';
import ImageNav2 from './assets/tb2.png';
import ImageNav3 from './assets/tb3.png';
import ImageNav4 from './assets/tb4.png';
import ImageNav5 from './assets/tb5.png';

@observer
export default class extends Component {
  @observable list = [
    {
      text: '我的账户',
      img: ImageNav1,
      href: '',
      childrens: [
        { href:'', text:'账户信息' },
        { href:'', text:'银行卡管理' },
        { href:'', text:'彩种信息' },
        { href:'', text:'我要充值' },
        { href:'', text:'我要提现' },
        { href:'', text:'紫金转换' }
      ]
    },
    {
      text: '帐变报表',
      img: ImageNav2,
      href: '',
      childrens: [
        { href:'', text:'盈亏报表' },
        { href:'', text:'投注记录' },
        { href:'', text:'追号记录' },
        { href:'', text:'帐变记录' },
        { href:'', text:'充值记录' },
        { href:'', text:'转变记录' }
      ]
    },
    {
      text: '团队管理',
      img: ImageNav3,
      href: '',
      childrens: [
        { href:'', text:'用户列表' },
        { href:'', text:'团队统计' },
        { href:'', text:'推广链接' }
      ]
    },
    {
      text: '优惠活动',
      img: ImageNav4,
      href: '',
      childrens: []
    },
    {
      text: '公告管理',
      img: ImageNav5,
      href: '',
      childrens: []
    },
  ];
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div className={'NavList clearfix'}>
        <ul className='nav'>
          {
            this.list.map((value,index)=>{
              return (
                <li key={index}>
                  <img src={value.img} />
                  <p><Link to={value.href} >{value.text}</Link></p>
                  {
                    !!value.childrens.length && 
                    <ul>
                      {
                        value.childrens.map((v,i)=>{
                          return (<li><Link to={v.href}>{v.text}</Link></li>)
                        })
                      }
                    </ul>
                  }
                </li>
              )
            })
          }
        </ul>
      </div>
    );
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
}


