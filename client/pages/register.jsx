import React from 'react';
import Resizer from 'react-image-file-resizer';

export default class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: null,
      password: null,
      firstPage: true,
      displayName: null,
      info: null,
      img: null,
      file: null
    };
    this.usernameChange = this.usernameChange.bind(this);
    this.passwordChange = this.passwordChange.bind(this);
    this.firstSubmit = this.firstSubmit.bind(this);
    this.displayNameChange = this.displayNameChange.bind(this);
    this.infoChange = this.infoChange.bind(this);
    this.fileInputRef = React.createRef();
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
    this.finishRegistration = this.finishRegistration.bind(this);
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

  displayNameChange() {
    this.setState({
      displayName: event.target.value
    });
  }

  infoChange() {
    this.setState({
      info: event.target.value
    });
  }

  firstSubmit(event) {
    event.preventDefault();
    this.setState({
      firstPage: false
    });
  }

  finishRegistration(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('username', this.state.username);
    formData.append('password', this.state.password);
    formData.append('displayName', this.state.displayName);
    formData.append('description', this.state.info);
    formData.append('image', this.state.file);
    fetch('/api/auth/sign-up', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          username: null,
          password: null,
          firstPage: true,
          displayName: null,
          info: null,
          img: null,
          file: null
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => {
        throw err;
      });
  }

  fileChangedHandler(event) {
    const img = URL.createObjectURL(event.target.files[0]);
    this.setState({
      img
    });
    let fileInput = false;
    if (event.target.files[0]) {
      fileInput = true;
    }
    if (fileInput) {
      Resizer.imageFileResizer(
        event.target.files[0],
        300,
        300,
        'JPEG',
        100,
        0,
        uri => {
          this.setState({
            file: uri
          });
        },
        'file',
        200,
        200
      );
    }
  }

  render() {
    const isUploaded = (
      <div className="absolute center-element add-profile-button">
        <input className="profile-upload"
          required type="file"
          name="avatarUrl"
          ref={this.fileInputRef}
          accept=".png, .jpg, .jpeg"
          onChange={this.fileChangedHandler}/>
      </div>);

    const imgPreview = this.state.img
      ? <img className="registration-photo" src={this.state.img}/>
      : null;
    const firstPage = this.state.firstPage
      ? <div className="log">
      <form onSubmit={this.firstSubmit}>
          <div className="login">
              <div className="register row justify-space">
                <div><h2><a href="#">Login</a></h2></div>
                <div><h2 className="register-on">Register</h2></div>
              </div>
              <div className="create-username">
                <h2>Create a username</h2>
                <input name="username" id="username" onChange={this.usernameChange} type="text"></input>
              </div>
              <div className="create-password">
                <h2>Create a password</h2>
                <input name="password" id="password" onChange={this.passwordChange} type="password"></input>
              </div>
              <div className="submit">
                <button>Register</button>
              </div>
          </div>
          </form>
        </div>
      : <div className="log secondPage">
          <form onSubmit={this.finishRegistration}>
          <div className="login">
              <div className="register row justify-space">
              <div className="image-upload2">
                    { isUploaded }
                    { imgPreview }
              </div>
            </div>
              <div className="create-username">
                <h2>Display Name</h2>
                <textarea name="displayName" id="displayName" className="extra-user-inputs" onChange={this.displayNameChange}/>
              </div>
              <div className="create-password">
                <h2>Short Description</h2>
                <textarea name="description" id="description" className="extra-user-inputs profile-description" onChange={this.infoChange}/>
              </div>
              <div className="submit">
                <button>Complete Registration</button>
              </div>
          </div>
          </form>
        </div>;
    return (
      <>
      { firstPage }
      </>
    );
  }
}
