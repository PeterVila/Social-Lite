import React from 'react';
import io from 'socket.io-client';
import Chat from './chat';

export default class Rooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      room: null,
      showChat: false
    };
    this.joinRoom = this.joinRoom.bind(this);
    this.socket = io('http://localhost:3001');
  }

  joinRoom() {
    this.setState({
      showChat: true,
      room: 'Public'
    });
    this.socket.emit('join_room', 'Public');
  }

  componentDidMount() {
    this.socket.on('connection');
  }

  componentWillUnmount() {
    this.socket.disconnect();
  }

  render() {
    return (
      <>
      {!this.state.showChat
        ? (
      <>
      <div className="row">
        <h1 className="room-header">Join a room!</h1>
      </div>
      <div className="row">
        <button className="join-chat-button" onClick={this.joinRoom}>Public</button>
      </div>
      </>
          )
        : (<Chat socket={this.socket} username={this.props.username} room={this.state.room} avatar={this.props.avatar}/>)
      }
      </>
    );
  }
}
