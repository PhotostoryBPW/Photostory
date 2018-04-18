import React from 'react';
import axios from 'axios';
import PostHeader from './PostHeader.jsx';
import moment from 'moment';

class Post extends React.Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);
    this.setLike = this.setLike.bind(this);
    this.clearLike = this.clearLike.bind(this);
    this.toggleLike = this.toggleLike.bind(this);

    this.state = {
      post: '',
      username: '',
      clicked: false,
      commentText: '',
      hasLiked: ''
    }
  }

  checkLike() {
    if (this.props.liked.indexOf(this.props.post.id) > -1) {
      this.state.hasLiked = true;
    } else {
      this.state.hasLiked = false;
    }
  }
  
  componentDidUpdate() {
    this.nameInput && this.nameInput.focus();
  }

  onSubmitCommentHandler() {
    axios.post(`api/comment/`, {
      params: {
        users_id: null,  
        body: this.state.commentText,
        postLoc: null,
        photoUrl: null,
        createdAt: Date.now(),
        filt: null,
        parent_id: this.props.postId
      }
    })
    .then( response => {
      console.log('response', response)
      this.setState({ 
        searchData: response.data
      })
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  onTypeHandler(e) {
    console.log(e.target.value);
    this.setState({commentText: e.target.value});
  }
  
  setLike() {
    axios.post('api/like', this.props.post.id)
      .then( response => {
        console.log('post success ', response.body);
      })
      .catch( err => {
        console.log(err);
      })
    this.checkLike();
  }

  clearLike() {
    axios.post('api/unlike', this.props.post.id)
      .then( response => {
        console.log('post success ', response.body);
        })
      .catch( err => {
        console.log(err);
      })
    this.checkLike();
  }

  renderComment() {
    if (this.state.clicked === true) {
      return <div><input ref={(input) => { this.nameInput = input; }} onChange={this.onTypeHandler.bind(this)}/><button onClick={this.onSubmitCommentHandler.bind(this)}>POST</button></div> 
    } else {
      return 'Add a comment - click here to render a form to enter comment'
    }
  }

  toggleLike() {
    this.state.hasLiked ? (this.setState({hasLiked: false}), this.clearLike()) : (this.setState({hasLiked: true}), this.setLike()); 
  }

  likeText() {
    return this.state.hasLiked === false ? 'LIKE' : 'UNLIKE';
  }

  likeTip() {
    return this.state.hasLiked === false ? 'Like this post' : 'You have already liked this post';
  }

  clickHandler() {
    this.setState({clicked: true})
  }

  render() {
    return (
      <div className='postMain'>
        <div> 
          <div> {
            !!this.state.post && this.props.view !== 'profile' ?
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
        {this.checkLike()}
        <div className="postOptions">
        <div className="tooltip">
          <button className="buttonRed" onClick={this.toggleLike}>
          {this.checkLike()}
          <img />
          <span className="tooltiptext">{this.likeTip()}</span>
          <span>{this.likeText()}</span>
          </button>
        </div>
          <div className="addComment" className="tooltip"> <button className="buttonRed">
            <img /> 
            <span className="tooltiptext">Comment on this post</span> 
            COMMENT 
          </button></div>
          <div className='share' className="tooltip"> <button className="buttonRed">
            <img /> 
            <span className="tooltiptext">Share this post</span>
            SHARE 
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
        <br />
        <hr />
      </div>
    );
  }
}

export default Post;


