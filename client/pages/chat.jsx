import React from 'react';
import { format } from 'date-fns';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import AOS from 'aos';
import 'aos/dist/aos.css';
import io from 'socket.io-client';

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

  componentDidMount() {
    this.socket = io.connect();
    this.socket.emit('join_room', 'Public');

    this.socket.on('receive_message', data => {
      this.setState({
        messageList: this.state.messageList.concat(data)
      });
    });

    this.socket.on('getCount', arg1 => {
      const people = arg1 === 1
        ? 'You are the only person here :('
        : `There are currently ${arg1} users here!`;
      const message = {
        author: 'Bot',
        message: people,
        time: 'Welcome!',
        room: 'Public',
        avatar: 'https://c.tenor.com/T4664VfiM0cAAAAC/asistente-robot.gif'
      };
      this.setState({
        messageList: this.state.messageList.concat(message),
        message: ''
      });
    });
    AOS.init({
      duration: 1000
    });
    this.scrollToBottom();
  }

  setMessage(event) {
    this.setState({
      message: event.target.value
    });
  }

  enterSubmit(event) {
    if (event.keyCode === 13) {
      const comment = new Date();
      const sentTime = format(comment, 'hh:mmb');
      const messageData = {
        author: this.context.user.displayName,
        message: this.state.message,
        time: sentTime,
        room: 'Public',
        avatar: this.context.user.avatarUrl
      };
      this.socket.emit('send_message', messageData);
      this.setState({
        messageList: this.state.messageList.concat(messageData),
        message: ''
      });
    }
  }

  sendMessage() {
    const comment = new Date();
    const sentTime = format(comment, 'hh:mmb');
    const messageData = {
      author: this.context.user.displayName,
      message: this.state.message,
      time: sentTime,
      room: 'Public',
      avatar: this.context.user.avatarUrl
    };
    this.socket.emit('send_message', messageData);
    this.setState({
      messageList: this.state.messageList.concat(messageData),
      message: ''
    });
  }

  scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    if (!this.context.user) return <Redirect to="login" />;

    return (
        <div className="chat-window" data-aos="zoom-out-up"
        data-aos-duration="500" ref={el => { this.el = el; }}>
            <div className="chat-header">
                <p>Social Lite</p>
            </div>
     <div className="chat-body">
        <div className="message-container">
          {this.state.messageList.map((messageContent, index) => {
            return (
              <div
                key={index}
                data-aos="zoom-out-up"
                data-aos-duration="200"
                className="message"
                id={this.context.user.displayName === messageContent.author ? 'you' : 'other'}
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

Chat.contextType = AppContext;
