import React from 'react';
import PostList from './post-list';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };

  }

  componentDidMount() {
    fetch('/api/posts/')
      .then(res => res.json())
      .then(data => this.setState({
        posts: data
      }));
  }

  render() {
    return (
      <>
      <PostList posts={this.state.posts}/>
      </>
    );
  }
}
