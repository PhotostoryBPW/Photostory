import React from 'react';
import moment from 'moment';


class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      post: '',
      clicked: false
    }
  }
  
  renderComment() {
    if (!this.state.clicked) {
      return <input/>
    } else {
      return 'Add a comment - click here to render a form to enter comment'
    }
  }

  render() {
    console.log('got here to posts')
    return (
      <div>
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
        </div><br/>
        <div className='likes'>
          Liked by Judy, Meredith, and {this.props.post.like_counter} others.
        </div>
        <div className='addComment2' onClick={this.renderComment}>
          
        </div>
        <div className='postMoment'>
          {moment(this.props.post.createdAt).fromNow()}
        </div>
      </div>
    );
  }
}

export default Post;


