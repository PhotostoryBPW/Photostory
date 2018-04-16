import React from 'react';
import PostHeader from './PostHeader.jsx';
import moment from 'moment';


class Post extends React.Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);

    this.state = {
      post: '',
      username: '',
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
    return (
      <div className='postMain'>
        <div> 
          <div> {
            this.state.post && this.props.view !== 'profile' ?
            <PostHeader post={this.state.post} /> :
            <div></div>
          }
          </div>
        </div>
        <div className='postLocation'>  
          {this.props.post.postLoc}
        </div>
        <div className='postImage'>
          <img src={`http://${this.props.post.photoUrl}`}/>
        </div>
        <div className='postOptions'>
      <div className='like'><button className="buttonRed">
            <img /> LIKE
          </button></div>
          <div className='addComment'><button className="buttonRed">
            <img /> COMMENT
          </button></div>
          <div className='share'><button className="buttonRed">
            <img /> SHARE
          </button></div>
        </div>  
        <div className='likes'>
          Liked by Judy, Meredith, and {this.props.post.likesCount} others.
        </div>
        <br />
        <div className='body'>
          {this.props.post.body}
        </div>
        <br />
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


