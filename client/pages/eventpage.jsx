import React from 'react';
import PostList from './events';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class EventHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      loading: false
    };

  }

  componentDidMount() {
    if (this.context.user) {
      fetch('/api/posts/')
        .then(res => res.json())
        .then(data => this.setState({
          posts: data,
          loading: true
        }));
    }
  }

  render() {

    if (!this.context.user) return <Redirect to="login" />;
    const loadingSpinner = !this.state.loading && <div className="lds-dual-ring row"></div>;
    const emptyPosts = this.state.posts.length === 0 && this.state.loading && <div className="text-center empty"><h1>There are no events yet! Try creating one!</h1></div>;
    return (
      <>
      {loadingSpinner}
      {emptyPosts}
      <PostList posts={this.state.posts}/>
      </>
    );
  }
}

EventHome.contextType = AppContext;
