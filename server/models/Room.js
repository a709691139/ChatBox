class Room {
	constructor(options) {
		this.core = options.core;
		this.socket = this.core.io.sockets.in(this.id);
		this.name =  options.name || '新房间';
		this.id = options.id;
		
		this.users = {};
		this.userCount = 0;

		this.isDoubleUserRoom = !!options.isDoubleUserRoom; //是否双人私聊房间

		this.toJSON = this.toJSON.bind(this);
    this.addUser = this.addUser.bind(this);
    this.removeUser = this.removeUser.bind(this);
	}

	init(){
		
	}

	toJSON(){
		let users = Object.values(this.users).map((value)=>{
			return value.toJSON();
		});
		return {
			name: this.name,
			id: this.id,
			users: users,
			userCount: this.userCount,
			isDoubleUserRoom: this.isDoubleUserRoom,
		}
	}

	//添加 用户
	addUser(user){
		if( user ){
			this.userCount++;
			this.users[user.id] = user;
			user.socket.join(this.id);
			console.log(user.toJSON(),'已经加入',this.toJSON());
			user.socket.emit('user:joinRoom',this.toJSON());
	    this.socket.emit('room:userJoin', this.toJSON(), user.toJSON());
		}
	}
	//移出 用户
	removeUser(user){
		if( user ){
			this.userCount--;
			user.socket.emit('user:leaveRoom',this.toJSON());
			user.socket.leave(this.id);
			this.socket.emit('room:userLeave', this.toJSON(), user.toJSON());
			if(this.userCount==0){
				//人数为0，删除房间
				this.core.rooms.removeRoomById(this.id);
			}
		}
	}

	//修改房间名
	changeRoomName(name){
		this.name = name;
		this.socket.emit('room:changeRoomName', this.toJSON());
	}

}

module.exports = Room;