import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      location: '',
      postType: 'memory',
      userId: 1,
      file: null
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleChange = this.handleChange.bind(this);

  }

  handleCaptionChange(event) {
    this.setState({ caption: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleChange(event) {
    this.setState({
      file: URL.createObjectURL(event.target.files[0])
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('caption', this.state.caption);
    formData.append('location', this.state.location);
    formData.append('postType', this.state.postType);
    formData.append('userId', this.state.userId);
    formData.append('image', this.fileInputRef.current.files[0]);
    fetch('/api/posts', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          caption: '',
          location: ''
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    return (
      <div className="container">
        <form className="memory-form" onSubmit={this.handleSubmit}>
          <div className="row">
              <div className="image-upload row">
                    <input className="clickable-upload" required type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg, .gif" onChange={this.handleChange}/>
                    <img className="image-preview" src={this.state.file}/>

              </div>
          </div>
          <div className="post-buttons row">
              <button type="button" className="memory-button">Memory</button>
              <button type="button" className="event-button">Event</button>
          </div>
          <div className="location-form row">
              <h3>Location</h3>
              <input className="location-input" type="text" required autoFocus id="location" name="location" value={this.state.location} onChange={this.handleLocationChange}/>
          </div>
          <div className="caption-form row">
              <h3>Caption</h3>
              <textarea autoFocus id="location" name="location" value={this.state.caption} onChange={this.handleCaptionChange}/>
          </div>
          <div className="form-submit row">
              <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}
