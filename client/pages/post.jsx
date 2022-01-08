import React from 'react';
import Resizer from 'react-image-file-resizer';
import Redirect from '../components/redirect';
import AppContext from '../lib/app-context';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      caption: '',
      location: '',
      postType: 'memory',
      postTitle: '',
      eventDate: '',
      endDate: '',
      file: null,
      img: null,
      finished: false
    };
    this.fileInputRef = React.createRef();
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCaptionChange = this.handleCaptionChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.toggleMemory = this.toggleMemory.bind(this);
    this.toggleEvent = this.toggleEvent.bind(this);
    this.handleEventChange = this.handleEventChange.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleEndTime = this.handleEndTime.bind(this);
    this.fileChangedHandler = this.fileChangedHandler.bind(this);
  }

  componentDidMount() {
    AOS.init({
      duration: 1000
    });
  }

  toggleMemory() {
    this.setState({
      postType: 'memory',
      eventDate: '',
      endDate: ''
    });
  }

  toggleEvent() {
    this.setState({
      postType: 'event'
    });
  }

  handleTitleChange(event) {
    this.setState({
      postTitle: event.target.value
    });
  }

  handleCaptionChange(event) {
    this.setState({
      caption: event.target.value
    });
  }

  handleLocationChange(event) {
    this.setState({
      location: event.target.value
    });
  }

  handleEventChange(event) {
    this.setState({
      eventDate: event.target.value.substr(0, 16)
    });
  }

  handleEndTime(event) {
    this.setState({
      endDate: event.target.value.substr(0, 16)
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
        640,
        640,
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

  handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData();
    formData.append('caption', this.state.caption);
    formData.append('location', this.state.location);
    formData.append('postType', this.state.postType);
    formData.append('postTitle', this.state.postTitle);
    formData.append('userId', this.context.user.userId);
    formData.append('avatarUrl', this.context.user.avatarUrl);
    if (this.state.postType === 'event') {
      const timestampStart = new Date(this.state.eventDate).toISOString();
      const timestampEnd = new Date(this.state.endDate).toISOString();
      formData.append('eventDate', timestampStart);
      formData.append('endTime', timestampEnd);
    }
    formData.append('image', this.state.file);
    fetch('/api/posts', {
      method: 'POST',
      body: formData
    })
      .then(response => response.json())
      .then(() => {
        this.setState({
          caption: '',
          location: '',
          postType: 'memory',
          file: null,
          eventDate: '',
          postTitle: '',
          endDate: '',
          img: null,
          finished: true
        });
      })
      .catch(err => {
        throw err;
      });
  }

  render() {
    if (!this.context.user) return <Redirect to="login" />;
    if (this.state.finished) return <Redirect to="" />;
    const eventClicked = this.state.postType === 'event' ? 'event-button clicked' : 'event-button white-button';
    const memoryClicked = this.state.postType === 'memory' ? 'memory-button clicked' : 'memory-button white-button';
    const isUploaded = !this.state.file
      ? <input className="absolute center-element" required type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg" onChange={this.fileChangedHandler}/>
      : <input className="absolute center-element after-upload" required type="file" name="image" ref={this.fileInputRef} accept=".png, .jpg, .jpeg" onChange={this.fileChangedHandler}/>;
    const imgPreview = this.state.img
      ? <img className="image-preview" src={this.state.img}/>
      : null;
    return (
      <div className="container" data-aos="zoom-out-up"
        data-aos-duration="500">
        <form className="memory-form" onSubmit={this.handleSubmit}>
          <div className="image-upload">
            { isUploaded }
            { imgPreview }
          </div>
          <div className="post-buttons row">
            <button onClick={this.toggleMemory} type="button" className={memoryClicked}>Memory</button>
            <button onClick={this.toggleEvent} type="button" className={eventClicked}>Event</button>
          </div>
          {this.state.postType === 'event' &&
            <div className="date-form row">
              <h3>When?</h3>
              <input className="date-input text-center" type="datetime-local" id="eventDate" name="eventDate" value={this.state.eventDate} onChange={this.handleEventChange}/>
              <input className="date-input text-center" type="datetime-local" id="endDate" name="endDate" value={this.state.endDate} onChange={this.handleEndTime}/>
            </div>
          }
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
              <textarea id="location" required name="location" value={this.state.caption} onChange={this.handleCaptionChange}/>
          </div>
          <div className="form-submit row">
              <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

App.contextType = AppContext;
