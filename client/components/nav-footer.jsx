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
            <div className="icon">
                <i className="fas fa-home"></i> </div>
            <div className="icon">
                <i className="fas fa-user"></i>
            </div>
            <div className="post-icon">
                <i className="fas fa-camera"></i>
            </div>
            <div className="icon">
                <i className="fas fa-comments"></i> </div>
            <div className="icon">
                <i className="fas fa-video"></i>
            </div>
        </div>
    </footer>
    );
  }
}

export default AppDrawer;
