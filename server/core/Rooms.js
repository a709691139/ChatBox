const Room = require('../models/Room');

class Rooms {
	constructor(options) {
		this.list = {};
		this.listCount = 0;
		this.core = options.core;

		this.addNewRoom = this.addNewRoom.bind(this);
		this.removeRoomById = this.removeRoomById.bind(this);
		this.getNoBusyRooms = this.getNoBusyRooms.bind(this);
	}
	//创建 新房间
	addNewRoom(options){
		let id = Math.random();
		options.id = id;
		options.core = this.core;
		let room = new Room(options);
		this.core.io.sockets.emit('rooms:add', room.toJSON());
		this.list[id] = room;
		this.listCount++;
		return room;
	}
	//删除房间 by id
	removeRoomById(id){
		// console.log('removeRoomById',id);
		this.core.io.sockets.emit('rooms:delete', this.list[id].toJSON());
		this.listCount--;
		return (delete this.list[id]);
	}

	//获取房间 by id
	getRoomById(id){
		return this.list[id];
	}


	//获取有客服在的闲置房间
	getNoBusyRooms(){
		let list = {};
		for(let id in this.list){
			if(this.list[id].userCount == 1){
				list[id] = this.list[id];
			}
		}
		if(Object.keys(list).length==0){
			return false;
		}
		return list;
	}

}

module.exports = Rooms;