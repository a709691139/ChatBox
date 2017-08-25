import { observer } from 'mobx-react';
import { observable,action,computed } from 'mobx';

export default class User {
  id = ''; 
  @observable name = '';
  @observable role = '';

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
}
