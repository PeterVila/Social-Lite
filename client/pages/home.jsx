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
      addedComment: false
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

  resetState() {
    this.setState({
      open: false,
      addedComment: true
    });
  }

  closeModal() {
    this.setState({
      open: false
    });
  }

  componentDidMount() {
    Promise.all([
      fetch('/api/posts/'),
      fetch('/api/comments/')
    ])
      .then(([res1, res2]) => Promise.all([res1.json(), res2.json()]))
      .then(([data1, data2]) => this.setState({
        posts: data1,
        comments: data2
      }));
  }

  componentDidUpdate() {
    if (this.state.addedComment) {
      fetch(`/api/comments/${this.state.comments.length + 1}`)
        .then(res => res.json())
        .then(data => this.setState({
          comments: this.state.comments.concat(data)
        }));
      this.setState({
        addedComment: false
      });
    }
  }

  render() {
    return (
      <>
      {this.state.open ? <Modal postId={this.state.postId} changeState={this.resetState} closeModal={this.closeModal}/> : null}
      <PostList posts={this.state.posts} addComment={this.addComment} comments={this.state.comments}/>
      </>
    );
  }
}
