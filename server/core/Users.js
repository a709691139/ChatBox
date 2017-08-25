const User = require('../models/User');
const Staff = require('../models/Staff');

class Users {
	constructor(options) {
		this.core = options.core; 

		this.list = {};  //所有用户列表
		this.listCount = 0;

		this.waitingList = {}; //等待用户列表
		this.waitingListCount = 0;
		

		this.getUserById = this.getUserById.bind(this);
		this.getStaffs = this.getStaffs.bind(this);
		this.getStaffCount = this.getStaffCount.bind(this);
		this.addNewUser = this.addNewUser.bind(this);
		this.removeUserById = this.removeUserById.bind(this);
		this.addWaitingUser = this.addWaitingUser.bind(this);
		this.removeWaitingUserById = this.removeWaitingUserById.bind(this);
	}

	//检查 用户名已存在
	checkHasUsername(name){
		let flag = false;
		for(let i in this.list){
			if(this.list[i].name == name){
				flag = true;
				break;
			}
		}
		return flag;
	}
	//获取 用户by id
	getUserById(id){
		return this.list[id];
	}

	//获取 客服列表
	getStaffs(){
		let list = {};
		for(let i in this.list){
			if(this.list[i].role=='staff'){
				list[i] = this.list[i];
			}
		}
		return list;
	}
	//获取 客服数量
	getStaffCount(){
		return Object.keys(this.getStaffs).length
	}


	//添加新用户||新客服
	addNewUser(userOptions){
		if(userOptions.role=='user'){
			this.list[userOptions.id] = new User(userOptions);
		}
		else if(userOptions.role=='staff'){
			this.list[userOptions.id] = new Staff(userOptions);
		}
		this.listCount++;
		return this.list[userOptions.id];
	}
	removeUserById(id){
		delete this.list[id];
		this.listCount--;
	}

	//加入 等待链接客服列表
	addWaitingUser(user){
		console.log(user.name,'加入等待列表');
		this.waitingList[user.id] = user;
		this.waitingListCount++;
		return user;
	}
	//移出 等待链接客服列表
	removeWaitingUserById(id){
		delete this.waitingList[id];
		this.waitingListCount--;
	}

	


}

module.exports = Users; 