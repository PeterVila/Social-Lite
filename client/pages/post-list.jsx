import React from 'react';
import { format, formatDistance } from 'date-fns';
import Modal from '../components/modal';
import AppContext from '../lib/app-context';


class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.post.comments,
      isCommenting: false,
      postId: this.props.post.postId,
      isAttending: false,
      eventAttendees: this.props.post.eventAttendees
    };
    this.addComment = this.addComment.bind(this);
    this.cancelComment = this.cancelComment.bind(this);
    this.toggleAttending = this.toggleAttending.bind(this);
    this.attendingEvent = this.attendingEvent.bind(this);
  }

  toggleAttending() {
    this.setState(prevState => ({
      isAttending: !prevState.isAttending
    }));
  }

  addComment(comment) {
    fetch('/api/comments', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(comment)
    })
      .then(response => response.json())
      .then(data => {
        if (this.state.comments === null) {
          this.setState({
            comments: []
          });
        }
        this.setState({
          comments: this.state.comments.concat(data),
          isCommenting: false
        });
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  toggleComment() {
    this.setState({
      isCommenting: true
    });
  }

  cancelComment() {
    this.setState({
      isCommenting: false
    });
  }

  attendingEvent() {
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
            eventAttendees: []
          });
        }
        if (data.userId) {
          this.setState({
            eventAttendees: this.state.eventAttendees.concat(data)
          });
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
  }

  render() {
    const { postTitle, imageUrl, caption, eventDate, endTime, location, postId, avatarUrl } = this.props.post;
    const date = new Date(eventDate);
    const endDate = new Date(endTime);
    const formatDay = format(date, 'do');
    const formatMonth = format(date, 'LLLL');
    const formatStartTime = format(date, 'hh:mmb');
    const formatEndTime = format(endDate, 'hh:mmb');
    const messages = this.state.comments && this.state.comments.map((comment, index) => {
      const commentDate = new Date(comment.createdAt);
      const formatComment = formatDistance(new Date(), new Date(commentDate));
      const match = comment.postId === postId &&
         <div className="comments row justify-space">
          <div className="comment-user-left">
            <img className="comment-img" src={comment.avatarUrl}/>
            <p className="comment-message"><span className="comment-username">{`${comment.username}`}</span>{`: ${comment.content}`}</p>
          </div>
          <p className="time-ago">{formatComment}</p></div>;
      return (
        <div key={index}>{match}</div>
      );
    });
    const eventAttendeesList = eventDate && this.state.eventAttendees.map((attendee, index) => {
      const photo = attendee.avatarUrl;
      return (
        <img className="attendee-photo" src={photo} key={index}/>
      );
    });
    const memoryComment = !eventDate && <div className="row add-comment"><button onClick={() => this.toggleComment()}>Add a Comment</button></div>;
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
       <h4 className="event-planning"><span>{this.state.eventAttendees.length}</span> Attendees</h4>
      </div>;
    const cardHeader = eventDate && <div className="card-title row">
        <h4>{location}</h4>
        <h2>{postTitle}</h2>
       </div>;
    const eventHeader = !eventDate && <div className="card-title row">
        <h4>{location}</h4>
        <h2>{postTitle}</h2>
        <img className="comment-photo-header" src={avatarUrl} />
       </div>;
    const memoryOrEvent = eventDate
      ? <div className="event-image">
        <img src={imageUrl} alt=""/>
      </div>
      : <div className="memory-image">
        <img src={imageUrl} alt=""/>
      </div>;
    const eventAttendingButton = eventDate &&
      <div className="attending row">
        <button onClick={() => this.attendingEvent()}>Attending?</button>
      </div>;
    return (
    <>
    {this.state.isCommenting && <Modal postId={this.state.postId} addComment={this.addComment} toggleComment={this.toggleComment} isCommenting={this.state.isCommenting} cancelComment={this.cancelComment}/>}
      <div className="container">
          <div className="event card">
            { eventHeader }
            { memoryOrEvent }
            { eventDateElement }
            { cardHeader }
            { eventTimeElement }
            <div className="event-caption">
                <p className="caption">{caption}</p>
                    { messages }
                    {eventAttendeesList}
            </div>
        </div>
        {eventAttendingButton}
        {memoryComment}
      </div>
    </>
    );
  }
}

export default function postList(props) {
  return (
    <>
    { props.posts.map((post, index) => {
      return (
        <Post
          key={post.postId}
          post={post}
        />
      );
    })}
    </>
  );
}

Post.contextType = AppContext;
