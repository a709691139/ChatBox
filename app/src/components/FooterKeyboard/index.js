import React, { Component } from 'react';
import { observer } from 'mobx-react';
import { observable,action } from 'mobx';
import { hashHistory, withRouter } from 'react-router';
import  './style.scss';
import { IndexLink, Link } from 'react-router';

@observer
export default class FooterKeyboard extends Component {
  @observable word = '';  //输入字
  @observable isKeyBoardFocus = false;  //是否键盘聚焦

  constructor(props) {
    super(props);
  }

  changeData=(name, value)=>{
    this[name] = value;
  }

  submitText=()=>{
  	this.props.submitText(this.word);
  	this.word = '';
  }
  submitImage=(e)=>{
    let _this = this;
    let selectedFile = this.refs['inputFile'].files[0];
    let name = selectedFile.name;
    let size = selectedFile.size;
    let reader = new FileReader();
    reader.onload = function(){
      _this.props.submitImage(this.result);
      this.value = null;
    };
    reader.readAsDataURL(selectedFile);
  }

  componentDidMount() {
  }
  componentWillUnmount() {

  }

  render() {
    return (
	    <div className={'components FooterKeyboard clearfix ' + (this.isKeyBoardFocus&&'focus')}>
	    	<div className='btns'>
	    		<i className="icon ion-happy-outline"></i>
	    		<i className="icon ion-android-image sendImage">
	    			<input type="file" ref="inputFile" accept='image/*' onChange={this.submitImage} />
	    		</i>
	    	</div>
	      <textarea 
	        placeholder='请输入' 
	        value={this.word} 
	        onChange={(event)=>this.changeData('word', event.target.value)}
	        onBlur={()=>this.changeData("isKeyBoardFocus",false)}
	        onFocus={()=>this.changeData("isKeyBoardFocus",true)} >
	       </textarea>
	      <button className='submit' onClick={()=>this.submitText()}>发送</button>
	    </div>
    );
  }
}

FooterKeyboard.defaultProps={
	submitText:()=>{},
	submitImage:()=>{},
}