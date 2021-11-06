import React from 'react';
import PostList from './post-list';
import Modal from '../components/modal';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: false,
      posts: [],
      open: false
    };
    this.addComment = this.addComment.bind(this);
    this.resetState = this.resetState.bind(this);
  }

  addComment(postId) {
    this.setState({
      postId: postId,
      open: true
    });
  }

  resetState() {
    this.setState({
      open: false
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
      {this.state.open ? <Modal postId={this.state.postId} changeState={this.resetState}/> : null}
      <PostList posts={this.state.posts} addComment={this.addComment} />
      </>
    );
  }
}
