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
    // fetch('/api/posts/')
    //   .then(response => response.json())
    //   .then(posts => this.setState({ posts: posts }));
    // fetch('/api/comments/')
    //   .then(response => response.json())
    //   .then(comments => this.setState({ comments: comments }));
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

  render() {
    return (
      <>
      {this.state.open ? <Modal postId={this.state.postId} changeState={this.resetState}/> : null}
      <PostList posts={this.state.posts} addComment={this.addComment} comments={this.state.comments}/>
      </>
    );
  }
}
