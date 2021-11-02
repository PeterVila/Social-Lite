import React from 'react';
// import Home from './pages/home';
import Post from './pages/post';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return <Post />;
  }
}
