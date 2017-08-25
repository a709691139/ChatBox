import { observable,computed,observe,action,transaction,toJS } from 'mobx';

class UserStore{
  constructor() { 
  }
  @observable name = '赵日天';
  @observable money = 0.1666;

  login(){}
  logout(){}
}
const userStore = new UserStore();
export default userStore;
