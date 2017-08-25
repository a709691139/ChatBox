import React, {
  Component,
  PropTypes
} from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import {
  IndexLink,
  Link
} from 'react-router';
import './style.scss';
import HeaderAnnounce from './HeaderAnnounce';
import NavList from './NavList';
import UserBox from './UserBox';
import ImageLogo from './assets/logo.png';

class AppContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const key = this.props.location.pathname.split('/')[1] || 'root';
    return (
      <div className='pageContainer'>
        <HeaderAnnounce />
        <div className="headerRow2">
          <div className='logo'>
            <IndexLink to='/' activeClassName='route--active'>
              <img  src={ImageLogo} />
            </IndexLink>
          </div>
          <NavList className='hahah' />
          <UserBox />
        </div>
        <div className="clearfix bottomContainer">
          <div className='leftNav'>左侧列表</div>
          <ReactCSSTransitionGroup
            component="div" transitionName="swap"
            transitionEnterTimeout={500} transitionLeaveTimeout={500}
            className='mainContainer'
          >
            {React.cloneElement(this.props.children || <div />, { key })}
          </ReactCSSTransitionGroup>
        </div>
      </div>
    );
  }
  componentDidMount() {

  }
  componentWillUnmount() {
  }
}
/*
<Link to="/counter" activeStyle={{color: 'red'}}>index counter   </Link>
<Link to={{ pathname: '/what/first', state:{userid: 10086}, query: { age: 23 } }} activeStyle={{color: 'red'}}>what</Link>
*/
export default AppContainer;


