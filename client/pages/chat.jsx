import React from 'react';
import io from 'socket.io-client';
import { format } from 'date-fns';

export default class Chat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      messageList: []
    };
    this.setMessage = this.setMessage.bind(this);
    this.sendMessage = this.sendMessage.bind(this);
    this.enterSubmit = this.enterSubmit.bind(this);
  }

  setMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  enterSubmit(event) {
    if (event.keyCode === 13) {
      const comment = new Date(Date.now());
      const sentTime = format(comment, 'hh:mmb');
      const messageData = {
        author: this.props.username,
        message: this.state.message,
        time: sentTime,
        room: 'Public',
        avatar: this.props.avatar
      };
      this.socket.emit('send_message', messageData);
      this.setState({
        messageList: this.state.messageList.concat(messageData),
        message: ''
      });
    }
  }

  sendMessage() {
    const comment = new Date(Date.now());
    const sentTime = format(comment, 'hh:mmb');
    const messageData = {
      author: this.props.username,
      message: this.state.message,
      time: sentTime,
      room: 'Public',
      avatar: this.props.avatar
    };
    this.socket.emit('send_message', messageData);
    this.setState({
      messageList: this.state.messageList.concat(messageData),
      message: ''
    });
  }

  componentDidMount() {
    this.socket = io.connect();
    this.socket.emit('join_room', 'Public');
    this.socket.on('receive_message', data => {
      this.setState({
        messageList: this.state.messageList.concat(data)
      });
    });
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>Social Lite</p>
            </div>
     <div className="chat-body">
        <div className="message-container">
          {this.state.messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                className="message"
                id={this.props.username === messageContent.author ? 'you' : 'other'}
              >
                <div className="message-row">
                  <img src={messageContent.avatar}/>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
            <div className="chat-footer">
                <input type="text" placeholder="Enter message" onChange={this.setMessage} value={this.state.message} onKeyDown={e => this.enterSubmit(e)}/>
                <button onClick={this.sendMessage}>Submit</button>
            </div>
        </div>
    );
  }
}
