import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable,action,computed } from 'mobx';
import { hashHistory, withRouter } from 'react-router';
import  './style.scss';
import { IndexLink, Link } from 'react-router';
import io from 'socket.io-client';
import FooterKeyboard from 'components/FooterKeyboard';
import ChatBox from 'components/ChatBox';
import RoomManager from 'components/RoomManager';
import RoomHeader from 'components/RoomHeader';
import { Room,Rooms} from './Rooms';
import User from './User';

@observer
class MainChat extends Component {
  socket = null;
  @observable userMe = new User();
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

  submitText=(text)=>{
    console.log('发送文字',this.focusRoom.id, this.userMe.id, text);
    this.socket.emit("message:newText",this.focusRoom.id, this.userMe.id, text);
  }
  submitImage=(image)=>{
    console.log('发送图片',this.focusRoom.id, this.userMe.id);
    this.socket.emit("message:newImage",this.focusRoom.id, this.userMe.id, image);
  }

  render() {
    return (
      <div className={'home '}>
        <RoomManager rooms={this.rooms} userMe={this.userMe} />
        <div className='mainRoomBox'>
          <RoomHeader userMe={this.userMe} focusRoom={this.focusRoom} waitPeoplesNum={this.waitPeoplesNum} />
          <ChatBox ref='ChatBox' messageList={this.focusRoom.messageList} userMe={this.userMe} />
          <FooterKeyboard submitText={this.submitText} submitImage={this.submitImage}  />
        </div>
      </div>
    );
  }
}

export class UserMainChat extends MainChat {
  constructor(props) {
    super(props);
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
    this.socket.on('user:nameExisted', function() {
      console.warn("用户名已存在");
      _this.login();
    });
    this.socket.on('user:loginSuccess', function(user) {
      console.warn("登录成功", user);
      _this.userMe.changeDataObj({
        name: user.name,
        id: user.id,
        role: user.role,
      });
      _this.requestConnectStaff();
    });
    this.socket.on('error', function(err) {
      console.warn("error",err);
    });
    this.socket.on('system:peopleCount', function(obj) {
      console.warn("等待人数",obj);
      _this.waitPeoplesNum = obj.waitingList;
    });
    this.socket.on('message:newText', function(room, user, message) {
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
    this.socket.on('message:newImage', function(room, user, message) {
      console.warn("收到消息图片",room, user);
      if(!message){
        message = '';
      }
      if(typeof(message) != 'string'){
        message = JSON.stringify(message);
      }
      let getRoom = _this.rooms.getRoomById(room.id);
      getRoom && getRoom.addNewMessage({
        type: 'image',
        content: message,
        from: user
      });
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
  }

  login=()=>{
    let name = prompt('请输入用户名');
    this.socket.emit("user:login", name);
  }

  requestConnectStaff=()=>{
    console.log('请求连接客服')
    this.socket.emit('user:wait');
  }

  componentDidMount() {
    this.connectSocket();
  }
}

export class StaffMainChat extends MainChat {
  constructor(props) {
    super(props);
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
      _this.userMe.changeDataObj({
        name: user.name,
        id: user.id,
        role: user.role,
      });
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
    this.socket.on('message:newText', function(room, user, message) {
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
      _this.refs['ChatBox'].scrollToBottom();
    });
    this.socket.on('message:newImage', function(room, user, message) {
      console.warn("收到消息图片",room, user);
      if(!message){
        message = '';
      }
      if(typeof(message) != 'string'){
        message = JSON.stringify(message);
      }
      let getRoom = _this.rooms.getRoomById(room.id);
      getRoom && getRoom.addNewMessage({
        type: 'image',
        content: message,
        from: user
      });
      _this.refs['ChatBox'].scrollToBottom();
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

  componentDidMount() {
    this.connectSocket();
  }
}
