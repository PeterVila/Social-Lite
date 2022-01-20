import React from 'react';
import AppContext from '../lib/app-context';
import Redirect from '../components/redirect';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null
    };
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.demoSignIn = this.demoSignIn.bind(this);
  }

  componentDidMount() {
    AOS.init({
      duration: 1000
    });
  }

  usernameChange() {
    this.setState({
      username: event.target.value
    });
  }

  passwordChange() {
    this.setState({
      password: event.target.value
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(this.state)
    };
    fetch('/api/auth/sign-in', req)
      .then(res => res.json())
      .then(result => {
        this.context.handleSignIn(result);
      });
  }

  demoSignIn(event) {
    event.preventDefault();
    const obj = {
      username: 'demo',
      password: 'demo'
    };
    const req = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(obj)
    };
    fetch('/api/auth/demo-sign-in', req)
      .then(res => res.json())
      .then(result => {
        this.context.handleSignIn(result);
      });
  }

  render() {
    const { user, route, handleSignIn } = this.context;
    if (user) return <Redirect to="" />;
    return (
      <>
        <StartRegistration handleSubmit={this.handleSubmit} usernameChange={this.usernameChange} passwordChange={this.passwordChange} key={route.path} action={route.path} onSignIn={handleSignIn} demoSignIn={this.demoSignIn}/>
      </>
    );
  }
}

function StartRegistration(props) {
  return (
    <>
    <div className="row login-title">
      <h1 data-aos="zoom-in" data-aos-offset="0">
Social Lite</h1>
    </div>
    <div className="log" data-aos="zoom-in-up">
      <form onSubmit={props.handleSubmit}>
          <div className="login">
              <div className="row justify-space">
                <div><h2 className="register-on">Login</h2></div>
                <div><h2 className="register"><a href="#register">Register</a></h2></div>
              </div>
              <div className="create-username">
                <h2>Username</h2>
                <input name="username" id="username" onChange={props.usernameChange} type="text"></input>
              </div>
              <div className="create-password">
                <h2>Password</h2>
                <input name="password" id="password" onChange={props.passwordChange} type="password"></input>
              </div>
              <div className="submit">
                <button>Login</button>
            </div>
        </div>
      </form>
      <button data-testid="demoButton" className="demo-login" onClick={props.demoSignIn}>Demo</button>
    </div>
    </>
  );
}

Login.contextType = AppContext;
