import React from 'react';
import PostList from './events';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class EventHome extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    };

  }

  componentDidMount() {
    if (this.context.user) {
      fetch('/api/posts/')
        .then(res => res.json())
        .then(data => this.setState({
          posts: data
        }));
    }
  }

  render() {

    if (!this.context.user) return <Redirect to="login" />;

    return (
      <>
      <PostList posts={this.state.posts}/>
      </>
    );
  }
}

EventHome.contextType = AppContext;
