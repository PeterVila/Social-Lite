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
    const isClicked = this.state.isClicked ? 'show-nav' : 'hide-nav';
    const modalBackground = this.state.isClicked ? 'nav-background' : 'no-nav-background';
    const backdrop = this.state.isClicked ? this.handleClick : null;
    return (
        <>
        <div className={modalBackground}>
            <i onClick={this.handleClick} className="hamburger fas fa-bars"></i>
            <div onClick={ backdrop } className="backdrop"></div>
            <div className={`nav-slider ${isClicked}`}>
              <h3>Choose a Game</h3>
              <ul>
                <li onClick={this.handleClick}>The Legend Of Zelda</li>
                <li onClick={this.handleClick}>A Link to the Past</li>
                <li onClick={this.handleClick}>Ocarina of Time</li>
                <li onClick={this.handleClick}>The Wind Waker</li>
                <li onClick={this.handleClick}>Breath of the Wild</li>
              </ul>
            </div>
          </div>
        </>
    );
  }
}

export default AppDrawer;
