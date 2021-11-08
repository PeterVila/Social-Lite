import React from 'react';
import PostList from './post-list';
import Modal from '../components/modal';
export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: false,
      posts: [],
      open: false,
      addedComment: false,
      comment: null
    };
    this.addComment = this.addComment.bind(this);
    this.resetState = this.resetState.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  addComment(postId) {
    this.setState({
      postId: postId,
      open: true
    });
  }

  resetState(data) {
    this.setState({
      open: false,
      addedComment: true,
      comment: data,
      postId: false
    });
  }

  closeModal() {
    this.setState({
      open: false
    });
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
      {this.state.open ? <Modal postId={this.state.postId} changeState={this.resetState} closeModal={this.closeModal}/> : null}
      <PostList posts={this.state.posts} addComment={this.addComment} addedCommentState={this.state.addedComment} newComment={this.state.comment} postId={this.state.postId} resetState={this.resetState} />
      </>
    );
  }
}
