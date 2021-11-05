import React from 'react';
import PostList from './post-list';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      posts: []
    };
    this.openEvent = this.openEvent.bind(this);
  }

  openEvent() {
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }));
  }

  componentDidMount() {
    fetch('/api/posts/')
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts }));
  }

  render() {
    return (
      <PostList posts={this.state.posts} openEvent={this.openEvent} />
    );
  }
}
