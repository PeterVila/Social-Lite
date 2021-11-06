import React from 'react';
import { format } from 'date-fns';

class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      comments: this.props.comments
    };
    this.toggleEvent = this.toggleEvent.bind(this);
  }

  toggleEvent() {
    this.setState({
      clicked: true
    });
  }

  render() {
    const { postTitle, imageUrl, caption, eventDate, endTime, location, postId } = this.props.post;
    const date = new Date(eventDate);
    const endDate = new Date(endTime);
    const formatDay = format(date, 'do');
    const formatMonth = format(date, 'LLLL');
    const formatStartTime = format(endDate, 'hh:mmb');
    const formatEndTime = format(endDate, 'hh:mmb');
    const messages = this.props.comments.map((comment, index) => {
      const commentDate = new Date(comment.createdAt);
      const formatComment = format(commentDate, "yyyy-MM-dd' At 'h:mmbbbb");
      const match = comment.postId === postId
        ? <p>{`${comment.userId} : ${comment.content} - (${formatComment})`}</p>
        : null;
      return (
        <div key={index}>{match}</div>
      );
    });
    const eventDateElement = eventDate
      ? <div className="event-date">
        <div className="row justify-center">
            <h1>{formatDay}</h1>
        </div>
        <div className="row justify-center">
            <h3>{formatMonth.substr(0, 3)}</h3>
        </div>
    </div>
      : null;
    const eventTimeElement = endTime
      ? <div className="row">
       <h4 className="event-time">{formatStartTime} - {formatEndTime}</h4>
       <h4 className="event-planning"><span>7</span> Planning to Go</h4>
      </div>
      : null;
    const cardHeader = eventDate
      ? <div className="card-title row">
        <h4>{location}</h4>
        <h2>{postTitle}</h2>
       </div>
      : null;
    const eventHeader = !eventDate
      ? <div className="card-title row">
        <h4>{location}</h4>
        <h2>{postTitle}</h2>
       </div>
      : null;
    const memoryOrEvent = eventDate
      ? <div className="event-image">
        <img src={imageUrl} alt=""/>
      </div>
      : <div className="memory-image">
        <img src={imageUrl} alt=""/>
      </div>;
    return (
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
            </div>
        </div>
        <div className="row add-comment"><button className="test" onClick={() => this.props.addComment(postId)}>Create a Comment</button>
</div>
      </div>
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
          addComment={props.addComment}
          comments={props.comments}
        />
      );
    })}
    </>
  );
}
