import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable,action,computed } from 'mobx';
import { hashHistory, withRouter } from 'react-router';
import  './style.scss';
import { IndexLink, Link } from 'react-router';
import FooterKeyboard from 'components/FooterKeyboard';
import ChatBox from 'components/ChatBox';
import RoomManager from 'components/RoomManager';
import RoomHeader from 'components/RoomHeader';
import io from 'socket.io-client';

@observer
class Staff extends Component {
  socket = null;
  @observable userMe = {
    name: '',
    id: '',
    role: '',
  };
  @observable rooms = new Rooms();
  @computed get focusRoom(){
    return this.rooms.list.concat().reduce((pre,next)=>{
      if(next.isFocus){
        pre = next;
      }
      return pre;
    }, new Room())
  }

  @observable waitPeoplesNum = 0; //等待连接人数

  constructor(props) {
    super(props);
  }

  changeData=(name, value)=>{
    this[name] = value;
  }

  connectSocket=()=>{
    let _this = this;
    this.socket = io.connect('ws://localhost:8888');
    this.socket.on('connect', function() {
      console.warn("connect成功");
      _this.login();
    });
    this.socket.on('disconnect', function() {
      console.warn("disconnect");
    });
    this.socket.on('staff:nameExisted', function() {
      console.warn("客服名已存在");
      _this.login();
    });
    this.socket.on('staff:loginSuccess', function(user) {
      console.warn("登录成功", user);
      _this.userMe = {
        name: user.name,
        id: user.id,
        role: user.role,
      };
    });
    this.socket.on('error', function(err) {
      console.warn("error",err);
    });
    this.socket.on('system:peopleCount', function(obj) {
      console.log("等待人数",obj);
      _this.waitPeoplesNum = obj.waitingList;
    });
    this.socket.on('user:joinRoom', function(room) {
      console.warn("加入房间",room);
      if(!_this.focusRoom.id){
        room.isFocus = true;
      }
      _this.rooms.addNewRoom(room);
    });
    this.socket.on('user:leaveRoom', function(room) {
      console.warn("离开房间",room);
      _this.rooms.removeRoomById(room.id);
    });
    this.socket.on('message:new', function(room, user, message) {
      console.warn("收到消息",room, user, message);
      if(!message){
        message = '';
      }
      if(typeof(message) != 'string'){
        message = JSON.stringify(message);
      }
      let getRoom = _this.rooms.getRoomById(room.id);
      getRoom && getRoom.addNewMessage({
        type: 'text',
        content: message,
        from: user
      });
    });
    this.socket.on('room:userJoin', function(room, user) {
      console.warn("某人加入房间",room, user);
      let myRoom = _this.rooms.getRoomById(room.id);
      myRoom.changeDataObj(room);
      myRoom.addNewMessage({
        type: 'text',
        content: user.name+"加入房间",
        from: 'system'
      });
    });
    this.socket.on('room:userLeave', function(room, user) {
      console.warn("某人离开房间",room, user);
      let myRoom = _this.rooms.getRoomById(room.id);
      myRoom.changeDataObj(room);
      myRoom.addNewMessage({
        type: 'text',
        content: user.name+"离开房间",
        from: 'system'
      });
    });
  }
  login=()=>{
    let name = prompt('请输入客服名称');
    this.socket.emit("staff:login", name);
  }

  submitText=(text)=>{
    console.log('发送文字',this.focusRoom.id, this.userMe.id, text);
    this.socket.emit("message:new",this.focusRoom.id, this.userMe.id, text);
  }

  componentDidMount() {
    this.connectSocket();
  }
  componentWillUnmount() {

  }

  render() {
    return (
      <div className={'home '}>
        <RoomManager rooms={this.rooms} userMe={this.userMe} />
        <div className='mainRoomBox'>
          <RoomHeader userMe={this.userMe} focusRoom={this.focusRoom} waitPeoplesNum={this.waitPeoplesNum} />
          <ChatBox messageList={this.focusRoom.messageList} userMe={this.userMe} />
          <FooterKeyboard submitText={this.submitText}  />
        </div>
      </div>
    );
  }
}

export default withRouter(Staff);


class Rooms {
  @observable list = [];

  constructor(options){
    if(options){
      for(let i in options){
        this[i] = options[i];
      }  
    }
  }

  getRoomById(id){
    return this.list.reduce((pre,next)=>{
      if(next.id == id){
        pre = next;
      }
      return pre;
    }, false)
  }

  addNewRoom(room){
    this.list.push(new Room(room));
  }
  removeRoomById(id){
    this.list = this.list.reduce((pre,next)=>{
      if(next.id != id){
        pre.push(next);
      }
      return pre;
    },[]);
  }

  setFocusRoomById=(id)=>{
    this.list.map((value)=>{
      value.toggleFocus(value.id==id);
    })
  }
}

class Room {
  @observable name = '';
  id = ''; 
  @observable users = [];
  @observable userCount = 0;  
  @observable isFocus = false;
  @observable isDoubleUserRoom = false;
  @observable messageList = [
    // {type:'text',content:'233',from:{name:'',id:'',role:''}}
  ];
  @observable newMessageCount = 0;

  constructor(options){
    if(options){
      for(let i in options){
        this[i] = options[i];
      }  
    }
  }

  changeDataObj(obj){
    for(let i in obj){
      this[i] = obj[i];
    }
  }
  changeUserCount(num){
    this.userCount = num;
  }

  toggleFocus(flag){
    this.isFocus = flag;
    if(flag){
      this.newMessageCount = 0;
    }
  }

  addNewMessage(message){
    this.messageList.push(message);
    if(!this.isFocus){
      this.newMessageCount++;
    }
  }
}