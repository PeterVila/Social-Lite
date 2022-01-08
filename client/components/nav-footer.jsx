import React from 'react';
import AppContext from '../lib/app-context';

class AppDrawer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClicked: false
    };
    this.handleClick = this.handleClick.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      isClicked: !prevState.isClicked
    }));
  }

  render() {
    const { handleSignOut } = this.context;
    const homePage = this.context.route.path === '' && 'blue';
    const eventPage = this.context.route.path === 'Events' && 'blue';
    const postPage = this.context.route.path === 'Post' && 'blue';
    const chatPage = this.context.route.path === 'Chat' && 'blue';
    const loginPage = this.context.route.path === 'login' && 'blue';
    return (
    <footer>
      <div className="row justify-center">
        <div className="icon text-center">
          <a href="#"><i className={`${homePage} fas fa-home`}></i></a>
        </div>
        <div className="icon text-center">
          <a href="#Events"><i className={`${eventPage} fas fa-calendar-week`}></i></a>
        </div>
        <div className="post-icon text-center">
          <a href="#Post"><i className={`${postPage} fas fa-camera`}></i></a>
        </div>
        <div className="icon text-center">
          <a href="#Chat"><i className={`${chatPage} fas fa-comment`}></i></a>
        </div>
        <div className="icon text-center">
          <a><i onClick={handleSignOut} className={`${loginPage} fas fa-sign-out-alt`}></i></a>
        </div>
      </div>
    </footer>
    );
  }
}

AppDrawer.contextType = AppContext;
export default AppDrawer;
