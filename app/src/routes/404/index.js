import React, { Component } from 'react';
import { hashHistory, withRouter} from 'react-router';

class Nothing extends Component{

  constructor(props) {
    super(props);
  }


  render(){
    return(
      <div style={{ margin: '0 auto' }}>
         nothing  404
      </div>
    );
  }
}

export default Nothing;

