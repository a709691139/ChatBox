import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable,action } from 'mobx';
import { hashHistory, withRouter} from 'react-router';
import  './counter.scss';
class CounterStore {
  @observable count = 1;

  @action
  increase = () => {
    this.count++;
  }

  @action
  adouble = () => {
    this.count = this.count*2;
  }
}
const counterStore = new CounterStore();

@observer
class Counter extends Component{
  constructor(props) {
    super(props);
  }

  toWhatPage(){
    console.log(this.props);
    // hashHistory.push({ pathname: '/what/666', state:{userid: 10086}, query: { age: 23 } });
    this.props.router.push({ pathname: '/what/666', state:{userid: 10086}, query: { age: 23 } });
  }
  render(){
    return(
      <div style={{ margin: '0 auto' }}>
        <h2 className='counterTitle'>Counter: {counterStore.count}</h2>
        <button className='btn btn-default' onClick={()=>{counterStore.increase()}}>
          Increment
        </button>
        {' '}
        <button className='btn btn-default' onClick={()=>{counterStore.adouble()}}>
          Double (Async)
        </button>
        <button className='btn' onClick={()=>{this.toWhatPage()}}>
          toWhatPage
        </button>
      </div>
    );
  }
}

export default withRouter(Counter);

