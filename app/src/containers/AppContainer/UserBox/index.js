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
import userStore from 'stores/UserStore';

@observer
export default class extends Component {
  constructor(props) {
    super(props);
  }
  fomatFloat(num){
    //保留两位小数  不进位
    // num = parseInt(num*100)/100;
    let f = parseFloat(num); 
    if (isNaN(f)) { 
      return false; 
    } 
    f = parseInt(num*100)/100; 
    let s = f.toString(); 
    let rs = s.indexOf('.'); 
    if (rs < 0) { 
      rs = s.length; 
      s += '.'; 
    } 
    while (s.length <= rs + 2) { 
      s += '0'; 
    } 
    return s; 
  }
  render() {
    return (
      <div className={'UserBox clearfix'}>
        <p>您好! {userStore.name}</p>
        <p>余额：{this.fomatFloat(userStore.money)} <a href="#">刷新</a></p>
        <div className="classify">
          <a href="#">充值</a>
            <a href="#">提现</a>
            <a href="#">资金转换</a>
            <a href="#">注销</a>
        </div>
      </div>
    );
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
}


