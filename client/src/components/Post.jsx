import React from 'react';
import moment from 'moment';


class Post extends React.Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);

    this.state = {
      post: '',
      clicked: false
    }
  }
  
  componentDidUpdate() {
    this.nameInput && this.nameInput.focus();
  }

  renderComment() {
    if (this.state.clicked === true) {
      return <div><input ref={(input) => { this.nameInput = input; }}/><button>POST</button></div> 
    } else {
      return 'Add a comment - click here to render a form to enter comment'
    }
  }

  clickHandler() {
    this.setState({clicked: true})
  }

  render() {
    console.log('got here to posts')
    return (
      <div>
        <div className='userImage'>
          <img src={`http://${this.props.post.userPhotoUrl}`}/>
        </div>
        <div className='userHandle'>
          {this.props.post.userHandle}
        </div><br/>
        <div className='postLocation'>
          {this.props.post.postLoc}
        </div>
        <div className='postImage'>
          <img src={`http://${this.props.post.photoUrl}`}/>
        </div>
        <div className='postOptions'>
          <div className='like'>
            <img /> LIKE
          </div>
          <div className='addComment'>
            <img /> COMMENT
          </div>
          <div className='share'>
            <img /> SHARE
          </div>
        </div>
        <div className='likes'>
          Liked by Judy, Meredith, and {this.props.post.likesCount} others.
        </div>
        <div className='body'>
          {this.props.post.body}
        </div>
        <div className='addComment2' onClick={this.clickHandler}>
          {this.renderComment()}
        </div>
        <div className='postMoment'>
          {moment(this.props.post.createdAt).fromNow()}
        </div>
      </div>
    );
  }
}

export default Post;


