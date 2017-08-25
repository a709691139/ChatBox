import { observer } from 'mobx-react';
import { observable,action,computed } from 'mobx';

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

export {
  Room,
  Rooms
};