import React from 'react';
import AppContext from '../lib/app-context';

class Modal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      modal: this.props.isCommenting,
      postId: this.props.postId
    };
    this.commentChange = this.commentChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  handleSubmit(event) {
    event.preventDefault();
    const obj = {
      postId: this.props.postId,
      content: this.state.comment,
      userId: this.context.user.userId,
      username: this.context.user.username
    };
    this.setState({
      comment: null,
      modal: false
    });
    this.props.addComment(obj);
  }

  commentChange() {
    this.setState({
      comment: event.target.value
    });
  }

  closeModal() {
    this.setState({
      modal: false
    });
  }

  render() {
    const closeModal = !this.state.modal ? 'modal-background hidden' : 'modal-background';
    return (
    <div className={closeModal}>
      <div className="modal">
      <form onSubmit={this.handleSubmit}>
      <div className="modal-text row">
            <h1>Comment</h1>
            <textarea onChange={this.commentChange} type="text" name="name" id="name"/>
          </div>
          <div className="row justify-evenly">
            <button type="button" onClick={this.props.cancelComment} id="cancel">Cancel</button>
            <button type="submit">Submit</button>
          </div>
        </form>
      </div>
    </div>
    );
  }
}

Modal.contextType = AppContext;
export default Modal;
