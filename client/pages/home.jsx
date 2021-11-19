import React from 'react';
import PostList from './post-list';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loaded: false
    };

  }

  componentDidMount() {
    if (this.context.user) {
      fetch('/api/posts/')
        .then(res => res.json())
        .then(data => this.setState({
          posts: data,
          loaded: true
        }));
    }
  }

  render() {

    if (!this.context.user) return <Redirect to="login" />;
    const loadingSpinner = !this.state.loaded && <div className="lds-dual-ring row"></div>;
    const emptyPosts = this.state.posts.length === 0 && this.state.loaded && <div className="text-center empty"><h1>There are no posts yet! Try creating one!</h1></div>;
    return (
      <>
      {loadingSpinner}
      {emptyPosts}
      <PostList posts={this.state.posts}/>
      </>
    );
  }
}

Home.contextType = AppContext;
