class User {
	constructor(options) {
		this.core = options.core;
		this.name = options.name || '用户名';
		this.id = options.id;
		this.socket = options.socket;
		this.ip = options.ip;
		this.role = 'user'; 

		this.rooms = {};
		this.roomCount = 0;
		// this.core.users.addWaitingUser(this);

		this.addAllListeners();

		this.toJSON = this.toJSON.bind(this);
		this.joinRoom = this.joinRoom.bind(this);
		this.leaveRoomById = this.leaveRoomById.bind(this);
		this.disconnect = this.disconnect.bind(this);
		this.addAllListeners = this.addAllListeners.bind(this);
		this.removeAllListeners = this.removeAllListeners.bind(this);
	}

	toJSON(){
		return {
			name: this.name,
			id: this.id,
			role: this.role,
		}
	}

	//加入 房间
	joinRoom(room){
		room.addUser(this);
		this.rooms[room.id] = room;
		this.roomCount++;
		return room;
	}
	//离开 房间 by id
	leaveRoomById(id){
		this.rooms[id].removeUser(this);
		delete this.rooms[id];
		this.roomCount--;
	}

	//断开链接
	disconnect(){
		//移出等待连接列表
		this.core.users.removeWaitingUserById(this.id);
		//离开房间
		if(this.roomCount){
			for(let id in this.rooms){
				this.leaveRoomById(id);
			}
		}
		//删除用户
		this.core.users.removeUserById(this.id);
	}

	//绑定事件
	addAllListeners(){
		this.removeAllListeners();
		//新消息--文字
		this.socket.on('message:newText', (roomId, userId, message)=>{
			// console.log('message:newText',roomId, userId, message);
			if(roomId && userId){
				let room = this.rooms[roomId];
				let user = this.core.users.getUserById(userId);
				// console.log("新消息",roomId, userId, message,room.toJSON(),user.toJSON())
				if(room && user){
					room.socket.emit('message:newText', room.toJSON(), user.toJSON(), message);
				}
			}
		});
		//新消息--图片
		this.socket.on('message:newImage', (roomId, userId, message)=>{
			// console.log('message:newImage',roomId, userId, message);
			if(roomId && userId){
				let room = this.rooms[roomId];
				let user = this.core.users.getUserById(userId);
				// console.log("新消息图片",roomId, userId, message,room.toJSON(),user.toJSON())
				if(room && user){
					room.socket.emit('message:newImage', room.toJSON(), user.toJSON(), message);
				}
			}
		});
		//请求加入等待列表
		this.socket.on('user:wait', ()=>{
			this.core.users.addWaitingUser(this);
		});
		//获取所有房间
		this.socket.on('room:getAllRooms', ()=>{
			let rooms = Object.values(this.rooms).map((value)=>{
				return value.toJSON();
			});
			this.socket.emit("room:getAllRooms", rooms);
		});
		//获取房间所有用户
		this.socket.on('room:getAllUsers', (roomId)=>{
			let users = Object.values(this.core.rooms.getRoomById(roomid).users);
			users = users.map((value)=>{
				return value.toJSON(); 
			});
			this.socket.emit("room:getAllUsers", users);
		});
	}
	removeAllListeners(){
		this.socket.removeAllListeners(['message:new']);
	}

}

module.exports = User;