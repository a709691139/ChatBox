import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable,action,toJS } from 'mobx';
import { hashHistory, withRouter } from 'react-router';
import  './style.scss';
import { IndexLink, Link } from 'react-router';

@observer
export default class RoomManager extends Component {
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
    // console.log('RoomManager',this.props.userMe)
    if(this.props.userMe.role=='user'){
      //普通用户不显示
      return null;
    }
    return (
	    <div className='components RoomManager'>
	    	{
	    		this.props.rooms.list.map((value,index)=>{
	    			return(
	    				<RoomRowBox
                setFocusRoomById={this.props.rooms.setFocusRoomById}
	    					room={value}
	    					key={index} />
	    			)
	    		})
	    	}
	    </div>
    );
  }
}
RoomManager.defaultProps = {
	rooms: {},
  userMe:{},
};


@observer 
class RoomRowBox extends Component {
  constructor(props) {
    super(props);
  }
  render() {
  	const { room,setFocusRoomById } = this.props;
    return (
	    <div className={'RoomRowBox clearfix '+ (room.isFocus&&'focus')} onClick={()=>{setFocusRoomById(room.id)}}>
				<p>{room.name}</p>
        {
          !!room.newMessageCount &&
          <span className='newMessagePoint'>{(room.newMessageCount<=99) ? room.newMessageCount: 99}</span>
        }
			</div>
    );
  }
}
RoomRowBox.defaultProps = {
  room:{},
  setFocusRoomById:()=>{},
};
