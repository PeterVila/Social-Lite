import React from 'react';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      location: '',
      postType: 'memory',
      file: null,
      eventDate: '',
      postTitle: '',
      endTime: ''
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.toggleMemory = this.toggleMemory.bind(this);
    this.toggleEvent = this.toggleEvent.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
  }

  componentDidMount() {
    fetch('/api/posts/')
      .then(res => res.json())
      .then(posts => this.setState({ posts: posts }));
  }

  handleCaptionChange(event) {
    this.setState({ caption: event.target.value });
  }

  handleLocationChange(event) {
    this.setState({ location: event.target.value });
  }

  handleTitleChange(event) {
    this.setState({ postTitle: event.target.value });
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
    formData.append('postTitle', this.state.postTitle);
    if (this.state.eventDate !== '') {
      formData.append('eventDate', this.state.eventDate);
      formData.append('endTime', this.state.endTime);
    }
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
    this.setState({
      postType: 'memory',
      eventDate: ''
    });
  }

  toggleEvent() {
    this.setState({ postType: 'event' });
  }

  handleEventChange(event) {
    this.setState({
      eventDate: event.target.value.substr(0, 16)
    });
  }

  handleEndTime(event) {
    this.setState({
      endTime: event.target.value.substr(0, 16)
    });
  }

  render() {
    const eventClicked = this.state.postType === 'event' ? 'event-button clicked' : 'event-button white-button';
    const memoryClicked = this.state.postType === 'memory' ? 'memory-button clicked' : 'memory-button white-button';
    const isUploaded = !this.state.file
      ? <input className="absolute center-element" required type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg, .gif" onChange={this.handleChange}/>
      : <input className="absolute center-element hidden" required type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg, .gif" onChange={this.handleChange}/>;
    return (
      <div className="container">
        <form className="memory-form" onSubmit={this.handleSubmit}>
          <div className="image-upload">
                { isUploaded }
                <img className="image-preview" src={this.state.file}/>
          </div>
          <div className="post-buttons row">
              <button onClick={this.toggleMemory} type="button" className={memoryClicked}>Memory</button>
              <button onClick={this.toggleEvent} type="button" className={eventClicked}>Event</button>
          </div>
          {this.state.postType === 'event'
            ? <div className="date-form row">
              <h3>When?</h3>
              <input className="date-input text-center" type="datetime-local" id="eventDate" name="eventDate" value={this.state.eventDate} onChange={this.handleEventChange}/>
              <input className="date-input text-center" type="datetime-local" id="endTime" name="endTime" value={this.state.endTime} onChange={this.handleEndTime}/>
          </div>
            : undefined}
          <div className="location-form row">
              <h3>Title</h3>
              <input className="location-input" type="text" required id="postTitle" name="postTitle" value={this.state.postTitle} onChange={this.handleTitleChange}/>
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
