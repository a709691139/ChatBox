import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable,action } from 'mobx';
import { hashHistory, withRouter } from 'react-router';
import  './style.scss';
import { IndexLink, Link } from 'react-router';

@observer
export default class ChatBox extends Component {
  constructor(props) {
    super(props);
  }
  changeData=(name, value)=>{
    this[name] = value;
  }

  scrollToBottom=()=>{
    const view = this.refs['ChatBox'];
    view.scrollTop = view.clientHeight;
  }
  componentDidMount() {
  }
  componentWillUnmount() {

  }
  render() {
    return (
	    <div className='components ChatBox' ref='ChatBox'>
	    	{
	    		this.props.messageList.map((value,index)=>{
	    			return(
	    				<MsgRow 
	    					userMe={this.props.userMe}
	    					message={value}
	    					key={index} />
	    			)
	    		})
	    	}
	    </div>
    );
  }
}
ChatBox.defaultProps = {
	userMe: {
    name: '',
    id: '',
    role: '',
  },
	messageList: [
		// {
  //     type: 'text',
  //     content: '66666666666666666666666',
  //     from: {name:'',id:'',role:''},
  //   },
  //   {
  //     type: 'image',
  //     content: 'https://ss3.baidu.com/73V1bjeh1BF3odCf/it/u=3972988672,1075090168&fm=202',
  //     from: {name:'',id:'',role:''},
  //   },
	],
};


@observer 
class MsgRow extends Component {
  constructor(props) {
    super(props);
  }

  renderSystemMsg(){
    let content = this.props.message.content;
    return(
      <div className='msgSystemRow'>{content}</div>
    )
  }
  renderUserMsg(){
    const { message,userMe } = this.props;
    let { type,content,from } = message;
    let isMe = (userMe.id == from.id);
    return (
      <div className='msgRow clearfix'>
        <i className={"icon ion-ios-person " + (!isMe?"icon-left":"icon-right")}></i>
        <p className={"fromName " + (!isMe?"fromName-left":"fromName-right")}>{isMe? '我': from.name}</p>
        <div className={'textWrap ' + (!isMe?"textWrap-left":"textWrap-right")}>
          {
            type=='text' &&
            <p>{content}</p>
          }
          {
            type=='image' &&
            <img src={content} />
          }
          <div className={'arrow' + (!isMe?"arrow-left":"arrow-right")}></div>
        </div>
      </div>
    );
  }
  render() {
  	const { message,userMe } = this.props;
  	let { from } = message;
  	if(from=='system'){
      return this.renderSystemMsg();
    }else{
      return this.renderUserMsg();
    }
    
  }
}
ChatBox.defaultProps = {
  message:{},
  userMe:{},
};
