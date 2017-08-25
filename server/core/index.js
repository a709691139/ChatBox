const io = require('socket.io'),
			Rooms = require('./Rooms'),
	    Users = require('./Users');

class Core {
	constructor() {
		this.io = null;
		this.rooms = new Rooms({core:this});
		this.users = new Users({core:this});
		this.name = '233';
		this.timerStart = null;

		this.init = this.init.bind(this);
		this.start = this.start.bind(this);
	}

	init(io){
		let _this = this;
		this.io = io;
		io.set('origins', '*:*');
		io.on('connection', (socket)=>{
		  socket.id = Math.random();
		  let clientIp = socket.request.connection.remoteAddress;
		  // console.log('connection',socket.id, clientIp);
		  //用户登录
		  socket.on('user:login', (name)=>{
		    console.log('user:login',name);
		    if (_this.users.checkHasUsername(name)) {
		      //用户名已存在
		      socket.emit('user:nameExisted');
		    } else {
		      let user = _this.users.addNewUser({
		        name,
		        id: socket.id,
		        socket: socket,
		        ip: clientIp,
		        role: 'user',
		        core: this,
		      });
		      socket.emit('user:loginSuccess', user);
		      // io.sockets.emit('system', nickname, users.length, 'login');
		    };
		  });
		  //客服登录
		  socket.on('staff:login', (name)=>{
		    console.log('staff:login',name);
		    if (_this.users.checkHasUsername(name)) {
		      //用户名已存在
		      socket.emit('staff:nameExisted');
		    } else {
		      let user = _this.users.addNewUser({
		        name,
		        id: socket.id,
		        socket: socket,
		        ip: clientIp,
		        role: 'staff',
		        core: this,
		      });
		      socket.emit('staff:loginSuccess', user);
		      // io.sockets.emit('system', nickname, users.length, 'login');
		    };
		  });

		  socket.on('disconnect', ()=>{
		    if (socket.id != null) {
		    	let user = _this.users.getUserById(socket.id);
		    	user && user.disconnect();
		      // socket.broadcast.emit('system', socket.nickname, users.length, 'logout');
		    }
		  });
		});

		this.start();
	}

	start(){
		this.timerStart && clearTimeout(this.timerStart);
		let userCount = this.users.listCount,
				staffCount = this.users.getStaffCount(),
				waitingListCount = this.users.waitingListCount;
		//发送在线人数，在线客服人数
		//闲置客服房间数量，
		//用户加入客服房间
		//用户等待人数
		

		//获取闲置房间列表
		let noBusyRooms = Object.values(this.rooms.getNoBusyRooms());
		//等待人列表
		let waitingList = Object.values(this.users.waitingList);

		if(noBusyRooms.length>0 && waitingList.length>0){
			let minLength = (noBusyRooms.length < waitingList.length) ? noBusyRooms.length : waitingList.length;
			for(let i=0; i<minLength; i++){
				//把闲置客人带去单人客服房间开房
				console.log(waitingList[i].toJSON(),'加入房间',noBusyRooms[i].id)
				waitingList[i].joinRoom(noBusyRooms[i]);
				this.users.removeWaitingUserById(waitingList[i].id);
			}
		}
		this.io.sockets.emit('system:peopleCount', {
			userCount: userCount,
			noBusyRooms:noBusyRooms.length,
			waitingList:waitingList.length,
		});

		this.timerStart = setTimeout(()=>{this.start()},3000);
	}

}

const core = new Core()
module.exports = core;