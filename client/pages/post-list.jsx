import React from 'react';
import Moment from 'react-moment';

function Post(props) {
  const { postTitle, imageUrl, caption, eventDate, endTime, location } = props.post;
  const eventDateElement = eventDate
    ? <div className="event-date">
        <div className="row justify-center">
            <h1><Moment format="D">{eventDate}</Moment></h1>
        </div>
        <div className="row justify-center">
            <h3><Moment format="MMM">{eventDate}</Moment></h3>
        </div>
    </div>
    : null;
  const eventTimeElement = endTime
    ? <div className="row">
       <h4 className="event-time"><Moment format="hh:mm A">{eventDate}</Moment> - <Moment format="hh:mm A">{endTime}</Moment></h4>
       <h4 className="event-planning"><span>7</span> Planning to Go</h4>
      </div>
    : null;
  return (
      <div className="container">
          <div className="event card">
            <div className="event-image">
                <img src={imageUrl} alt=""/>
            </div>
            { eventDateElement }
            <div className="card-title row">
                <h4>{location}</h4>
                <h2>{postTitle}</h2>
            </div>
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
