
const User = require('./User');

class Staff extends User {
	constructor(options) {
		super(options);
		this.role = 'staff';
		this.maxRoomCount = 10; //最多房间数量，联系用户

		this.createRooms();

		this.createRooms = this.createRooms.bind(this);
		this.disconnect = this.disconnect.bind(this);
	}

	//创建多个房间
	createRooms(){
		for(let i=this.roomCount; i<this.maxRoomCount; i++){
			let room = this.core.rooms.addNewRoom({
				name:'客服房间'+(i+1), 
				isDoubleUserRoom: true,
			});
			//加入房间
			this.joinRoom(room);
		}
	}

	disconnect(){
		if(this.roomCount){
			for(let id in this.rooms){
				//离开房间, 房间没人就自动删除
				this.leaveRoomById(id);
				//删除房间
				// this.core.rooms.removeRoomById(id);
			}
		}
		//删除用户
		this.core.users.removeUserById(this.id);
	}

}

module.exports = Staff;