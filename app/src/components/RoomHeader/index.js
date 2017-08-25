import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable,action } from 'mobx';
import { hashHistory, withRouter } from 'react-router';
// import  './style.scss';
import { IndexLink, Link } from 'react-router';

@observer
export default class RoomHeader extends Component {
  constructor(props) {
    super(props);
  }
  changeData=(name, value)=>{
    this[name] = value;
  }
  componentDidMount() {
  }
  componentWillUnmount() {

  }
  render() {
    let { userMe, focusRoom, waitPeoplesNum } = this.props; 
    let roomName = focusRoom.name;
    if(focusRoom.isDoubleUserRoom && (focusRoom.userCount==2)){
      roomName = focusRoom.users.reduce((pre,next)=>{
        if(next.id != userMe.id){
          pre = next.name;
        }
        return pre;
      },'');
    }
    return (
	    <div className='components RoomHeader'>
	    	<p className='title'>
          {roomName}
          {
            !focusRoom.id &&
            <span style={{marginLeft:15}}>等待连接人数：{waitPeoplesNum}</span>
          }
        </p>
	    </div>
    );
  }
}
RoomHeader.defaultProps = {
	userMe: {
    name: '',
    id: '',
    role: '',
  },
	focusRoom:{},
  waitPeoplesNum: 0,
};

