import React from 'react';



class Post extends React.Component {
  constructor() {
    super();
    this.state = {
      post: '',
    }
  }
  
  render() {
    return (
      <div>
        {  
        <div className='postImage'>
          <img src='placeholder.png'/>
        </div>
        <div className='postOptions'>
          <div className='like'>
            <img /> 
          </div>
          <div className='addComment'>
            <img /> 
          </div>
          <div className='share'>
            <img /> 
          </div>
        </div>
        <div className='likes'>
          Liked by Judy, Meredith, and 20 others.
        </div>
        <div className='addComment2'>
          Add a comment - click here to render a form to enter comment
        </div>
        <div className='postMoment'>
          Moment.js - posted 2 days ago.
        </div>
        }
    </div>
    );
  }
}

export default Post;
