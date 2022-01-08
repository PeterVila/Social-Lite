import React from 'react';
import { format } from 'date-fns';
import AppContext from '../lib/app-context';
import AOS from 'aos';
import 'aos/dist/aos.css';

class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postId: this.props.post.postId,
      isAttending: false,
      eventAttendees: this.props.post.eventAttendees
    };
    this.toggleAttending = this.toggleAttending.bind(this);
    this.attendingEvent = this.attendingEvent.bind(this);
  }

  componentDidMount() {
    AOS.init({
      duration: 1000
    });
  }

  toggleAttending() {
    this.setState(prevState => ({
      isAttending: !prevState.isAttending
    }));
  }

  attendingEvent() {
    if (!this.state.isAttending) {
      const obj = {
        userId: this.context.user.userId,
        postId: this.state.postId,
        avatarUrl: this.context.user.avatarUrl
      };
      fetch('/api/eventAttendees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(obj)
      })
        .then(response => response.json())
        .then(data => {
          if (this.state.eventAttendees === null) {
            this.setState({
              eventAttendees: null
            });
          }
          if (data.userId) {
            const attendees = [];
            for (let i = 0; i < this.state.eventAttendees.length; i++) {
              attendees.push(this.state.eventAttendees[i].userId);
            }
            if (!attendees.includes(data.userId)) {
              this.setState({
                eventAttendees: this.state.eventAttendees.concat(data),
                isAttending: true
              });
            }
          }
        })
        .catch(error => {
          console.error('Error:', error);
        });
    }
  }

  render() {
    const { postTitle, imageUrl, caption, eventDate, endTime, location } = this.props.post;
    const date = new Date(eventDate);
    const endDate = new Date(endTime);
    const formatDay = format(date, 'do');
    const formatMonth = format(date, 'LLLL');
    const formatStartTime = format(date, 'eee hh:mmb');
    const formatEndTime = format(endDate, 'eee hh:mmb');
    const eventAttendeeslength = this.state.eventAttendees && this.state.eventAttendees.length;
    const eventAttendeesList = this.state.eventAttendees && this.state.eventAttendees.map((attendee, index) => {
      const photo = attendee.avatarUrl;
      return (
        <img className="attendee-photo" src={photo} key={index}/>
      );
    });
    const eventDateElement = eventDate && <div className="event-date">
        <div className="row justify-center">
            <h1>{formatDay}</h1>
        </div>
        <div className="row justify-center">
            <h3>{formatMonth.substr(0, 3)}</h3>
        </div>
    </div>;
    const eventTimeElement = endTime && <div className="row">
       <h4 className="event-time">{formatStartTime} - {formatEndTime}</h4>
       <h4 className="event-planning"><span>{eventAttendeeslength}</span> Attendees</h4>
      </div>;
    const cardHeader = eventDate && <div className="card-title row">
        <h4>{location}</h4>
        <h2>{postTitle}</h2>
       </div>;
    const memoryOrEvent = eventDate && <div className="event-image">
        <img src={imageUrl} alt=""/>
      </div>;
    const eventAttendingButton = eventDate &&
      <div className="attending row">
        <button onClick={() => this.attendingEvent()}>Attending?</button>
      </div>;
    const eventsOnly = eventDate &&
          <div className="container" data-aos="fade-down" data-aos-offset="0">
          <div className="event card">
            { memoryOrEvent }
            { eventDateElement }
            { cardHeader }
            { eventTimeElement }
            <div className="event-caption">
                <p className="caption">{caption}</p>
                    {eventAttendeesList}
            </div>
        </div>
        {eventAttendingButton}
      </div>;
    return (
    <>
      { eventsOnly }
    </>
    );
  }
}

export default function postList(props) {
  return (
    <>
    { props.posts.map((post, index) => {
      return (
        <Events
          key={post.postId}
          post={post}
        />
      );
    })}
    </>
  );
}

Events.contextType = AppContext;
