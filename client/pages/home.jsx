import React from 'react';
import PostList from './post-list';

export default class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      posts: []
    };
    this.openEvent = this.openEvent.bind(this);
  }

  openEvent() {
    this.setState(prevState => ({
      clicked: !prevState.clicked
    }));
  }

  componentDidMount() {
    fetch('/api/posts/')
      .then(response => response.json())
      .then(posts => this.setState({ posts: posts }));
  }

  render() {
    const clickedEvent = this.state.clicked ? 'extra-info pop' : 'extra-info';
    return (
      <>
      <div className="container">
          <div className="event card">
            <div className="event-image">
                <img src="https://learningfuze.com/images/coding-bootcamp-in-orange-county/learningfuze-headquarters-in-irvine.jpg" alt=""/>
            </div>
            <div className="event-date">
                <div className="row justify-center">
                    <h1>29</h1>
                </div>
                <div className="row justify-center">
                    <h3>Oct</h3>
                </div>
            </div>
            <div className="card-title row">
                <h4>LearningFuze</h4>
                <h2>This is an event</h2>
            </div>
            <div className="row">
                <h4 className="event-time">10:00AM - 6:00PM</h4>
                <h4 className="event-planning"><span>7</span> Planning to Go</h4>
            </div>
            <div className="event-caption">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sunt a magni ullam qui aliquid minima
                    dolorum
                    eum optio voluptates dolores.</p>
            </div>
            <div className={clickedEvent}>
                <h2>More information</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Eveniet, dignissimos. Quibusdam itaque
                    commodi
                    sapiente, veritatis dolores corporis deserunt illo nisi eveniet incidunt nostrum excepturi corrupti
                    amet
                    dolor aspernatur, mollitia eligendi.</p>
            </div>
        </div>
      </div>
      <PostList posts={this.state.posts} openEvent={this.openEvent} />
      </>
    );
  }
}
