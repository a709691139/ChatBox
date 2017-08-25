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
import ImageNotice from './assets/notice.png';

import { Carousel } from 'antd';


@observer
export default class extends Component {
  @observable list = [
    {
      href:'',
      value: '1'
    },
    {
      href:'',
      value: '2222'
    },
    {
      href:'',
      value: '333'
    },
    {
      href:'',
      value: '44444'
    }
  ];
  constructor(props) {
    super(props);
  }
  render() {
    const CarouselSetting = {
      dots: false,
      infinite: true,
      speed: 500,
      autoplay: true,
      vertical: true,
    };
    return (
      <div className={'HeaderAnnounce clearfix'}>
        <div className="leftBlock"><p><img src={ImageNotice} />公告：</p></div>  
        <div className="rightBlock">
          <Carousel {...CarouselSetting}>
          {
            this.list.map((value,index)=>{
              return (
                <div key={index} className='innerBox' style={{height:'40px',width:'100%'}}><a href={value.href}>{value.value}{" 更多>>"}</a></div>
              );
            }) 
          }
          </Carousel>
        </div>
      </div>
    );
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
}


