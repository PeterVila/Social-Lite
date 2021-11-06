import React from 'react';
import PostList from './post-list';
import Modal from '../components/modal';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: false,
      posts: []
    };
    this.addComment = this.addComment.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  addComment(postId) {
    for (let i = 0; i < this.state.posts.length; i++) {
      if (this.state.posts[i].postId === postId) {
        this.setState({
          postId: postId
        });
      }
    }
  }

  resetState() {
    this.setState({
      postId: false
    });
  }

  componentDidMount() {
    fetch('/api/posts/')
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts }));
  }

  render() {
    return (
      <>
      {this.state.postId ? <Modal postId={this.state.postId} changeState={this.resetState}/> : null}
      <PostList posts={this.state.posts} addComment={this.addComment} />
      </>
    );
  }
}
