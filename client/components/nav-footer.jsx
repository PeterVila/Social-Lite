import React from 'react';

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
    return (
    <footer>
      <div className="row justify-center">
        <div className="icon text-center">
            <i className="fas fa-home"></i> </div>
        <div className="post-icon text-center">
            <i className="fas fa-camera"></i>
        </div>
      </div>
    </footer>
    );
  }
}

export default AppDrawer;
