import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      room: null,
      showChat: false
    };

  }

  render() {
    if (!this.context.user) return <Redirect to="login" />;
    return (
      <>
        <div className="chat-header row">
          <h1>Join A Room</h1>
        </div>
        <div className="row">
          <button className="join-button">Public</button>
        </div>
      </>
    );
  }
}

Chat.contextType = AppContext;
