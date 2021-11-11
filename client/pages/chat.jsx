import React from 'react';
import io from 'socket.io-client';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: null
    };
    this.setMessage = this.setMessage.bind(this);
  }

  setMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  componentDidMount() {
    this.socket = io.connect();
    this.socket.emit('join_room', 'Public');
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Public</p>
            </div>
     <div className="chat-body">
      </div>
            <div className="chat-footer">
                <input type="text" placeholder="Enter message" onChange={this.setMessage}/>
                <button>Submit</button>
            </div>
        </div>
    );
  }
}
