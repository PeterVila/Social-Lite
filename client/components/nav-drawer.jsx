import React from 'react';

class Navigation extends React.Component {
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
    const isClicked = this.state.isClicked ? 'show-nav' : 'hide-nav';
    const modalBackground = this.state.isClicked ? 'nav-background' : 'no-nav-background';
    const backdrop = this.state.isClicked ? this.handleClick : null;
    const drawerBackground = this.state.isClicked ? 'backdrop' : '';
    return (
      <nav className={modalBackground}>
        <div onClick={ backdrop } className={drawerBackground}></div>
        <div className={`nav-slider ${isClicked}`}>
          <h1>Social Lite</h1>
          <ul>
            <a href="#"><li onClick={this.handleClick}><h3>Home</h3></li></a>
            <a href="#post"><li onClick={this.handleClick}><h3>Create a Post</h3></li></a>

          </ul>
        </div>
        <div className="nav">
          <div className="hamburger">
            <i onClick={this.handleClick} className="fas fa-bars"></i>
         </div>
        </div>
      </nav>
    );
  }
}

export default Navigation;
