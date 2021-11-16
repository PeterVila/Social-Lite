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

    return (
    <footer>
      <div className="row justify-center">
        <div className="icon text-center">
          <a href="#"><i className="fas fa-home"></i></a>
        </div>
        <div className="icon text-center">
          <a href="#Events"><i className="fas fa-calendar-week"></i></a>
        </div>
        <div className="post-icon text-center">
          <a href="#Post"><i className="fas fa-camera"></i></a>
        </div>
        <div className="icon text-center">
          <a href="#Chat"><i className="fas fa-comment"></i></a>
        </div>
        <div className="icon text-center">
          <a><i onClick={handleSignOut} className="fas fa-sign-out-alt"></i></a>
        </div>
      </div>
    </footer>
    );
  }
}

AppDrawer.contextType = AppContext;
export default AppDrawer;
