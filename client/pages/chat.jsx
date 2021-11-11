import React from 'react';
// const socket = io.connect('http://localhost:4000') //connecting front end to back end
// const socket = io.connect("http://192.168.29.119:5000/");
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

  render() {
    return (
        <div className="chat-window">
            <div className="chat-header">
                <p>{this.props.room}</p>
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
