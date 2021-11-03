import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      location: '',
      postType: 'memory',
      file: null,
      eventDate: ''
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleMemory = this.toggleMemory.bind(this);
    this.toggleEvent = this.toggleEvent.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
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
    formData.append('eventDate', this.state.eventDate);
    formData.append('image', this.fileInputRef.current.files[0]);
    fetch('/api/posts', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          caption: '',
          location: '',
          file: null
        });
        this.fileInputRef.current.value = null;
      })
      .catch(err => {
        throw err;
      });
  }

  toggleMemory() {
    this.setState({ postType: 'memory' });
  }

  toggleEvent() {
    this.setState({ postType: 'event' });
  }

  handleEventChange(event) {
    this.setState({
      eventDate: event.target.value
    });
  }

  render() {
    const showEventDate = this.state.postType === 'event' ? 'date-form row' : 'date-form hidden';
    const memoryClicked = this.state.postType === 'memory' ? 'memory-button clicked' : 'memory-button white-button';
    const eventClicked = this.state.postType === 'event' ? 'event-button clicked' : 'event-button white-button';
    return (
      <div className="container">
        <form className="memory-form" onSubmit={this.handleSubmit}>
          <div className="image-upload">
                <input className="absolute center-element" required type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg, .gif" onChange={this.handleChange}/>
                <img className="image-preview" src={this.state.file}/>
          </div>
          <div className="post-buttons row">
              <button onClick={this.toggleMemory} type="button" className={memoryClicked}>Memory</button>
              <button onClick={this.toggleEvent} type="button" className={eventClicked}>Event</button>
          </div>
          <div className={showEventDate}>
              <h3>When?</h3>
              <input className="date-input text-center" type="datetime-local" id="eventDate" name="eventDate" value={this.state.eventDate} onChange={this.handleEventChange}/>
          </div>
          <div className="location-form row">
              <h3>Location</h3>
              <input className="location-input" type="text" required id="location" name="location" value={this.state.location} onChange={this.handleLocationChange}/>
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
