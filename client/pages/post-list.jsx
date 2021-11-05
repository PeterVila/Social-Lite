import React from 'react';
import { format } from 'date-fns';

function Post(props) {
  const { postTitle, imageUrl, caption, eventDate, endTime, location } = props.post;
  const date = new Date(eventDate);
  const endDate = new Date(endTime);
  const formatDay = format(date, 'do');
  const formatMonth = format(date, 'LLLL');
  const formatStartTime = format(endDate, 'hh:mmb');
  const formatEndTime = format(endDate, 'hh:mmb');
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
                <p>{caption}</p>
            </div>
            <div className='extra-info pop'>
                <h2>More information</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, dignissimos. Quibusdam itaque
                    commodi
                    sapiente, veritatis dolores corporis deserunt illo nisi eveniet incidunt nostrum excepturi corrupti
                    amet
                    dolor aspernatur, mollitia eligendi.</p>
            </div>
        </div>
      </div>
  );
}

export default function postList(props) {
  return (
    <>
    { props.posts.map(post => {
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
