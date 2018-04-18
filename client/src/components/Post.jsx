import React from 'react';
import axios from 'axios';
import PostHeader from './PostHeader.jsx';
import moment from 'moment';

class Post extends React.Component {
  constructor(props) {
    super(props);
    
    this.addCommentClickHandler = this.addCommentClickHandler.bind(this);
    this.setLike = this.setLike.bind(this);
    this.clearLike = this.clearLike.bind(this);
    this.toggleLike = this.toggleLike.bind(this);

    this.state = {
      post: this.props.post,
      username: '',
      clicked: false,
      commentText: '',
      children: this.props.post.children || '',
      view: this.props.view,
      hasLiked: ''
    }
    
    this.onSubmitCommentHandler = this.onSubmitCommentHandler.bind(this);
    console.log('props from POST', this.props);
  }
  
  checkLike() {
    if (this.props.liked.indexOf(this.props.post.id) > -1) {
      this.state.hasLiked = true;
    } else {
      this.state.hasLiked = false;
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
    var oldChildrenState
    axios.post(`api/comment/`, {
      params: {
        users_id: null,  
        body: this.state.commentText,
        postLoc: null,
        photoUrl: null,
        createdAt: Date.now(),
        filt: null,
        parent_id: this.props.post.id
      }
    })
    .then( response => {
      oldChildrenState = this.state.children;
      console.log('response', response, response.config.data);
      this.setState({clicked: false})
      console.log('this is old children state before updating', oldChildrenState);
      if (!!oldChildrenState && oldChildrenState.length > 0) {
        oldChildrenState.push((JSON.parse(response.config.data)).params);
      } else {
      oldChildrenState = [JSON.parse(response.config.data).params];
      }
    })
    .then( () => {
      console.log('this is old children state updated', oldChildrenState);
      this.setState({children: oldChildrenState});
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
      return <div><input ref={(input) => { this.nameInput = input; }} onChange={this.onTypeHandler.bind(this)}/><button onClick={this.onSubmitCommentHandler}>POST</button></div> 
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

  addCommentClickHandler() {
    this.setState({clicked: true})
  }

  render() {
    return (
      <div className='postMain'>
        <div> 
          <div> {
            !!this.state.post && this.state.view !== 'profile' ?
            <PostHeader userPhotoUrl={this.props.post.userPhotoUrl} userHandle={this.props.post.userHandle}/> 
            :
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
        <div className='postOptions'>
          <div className="tooltip">
            <div className='like'>
              <button className="buttonRed" onClick={this.toggleLike}>
                <img /> 
                <span className="tooltiptext">{this.likeTip()}</span>
                <span>{this.likeText()}</span>
              </button>
            </div>
          </div>  
          <div className='addComment tooltip'>
            <button className="buttonRed">
              <img /> 
              <span className="tooltiptext">Comment on this post</span> 
              COMMENT
            </button>
          </div>
          <div className='share tooltip'>
            <button className="buttonRed">
              <img /> 
              <span className="tooltiptext">Share this post</span>
              SHARE
            </button>
          </div>

        </div>  
        <div className='likes'>
          Liked by Judy, Meredith, and {this.props.post.likesCount} others.
        </div>
        <br />
        <div className='body'>
          {this.props.post.body}
        </div>
        <br />
        <div className='addComment2' onClick={this.addCommentClickHandler}>
          {this.renderComment()}
          {
            !!this.state.children ?
            this.state.children.map(child => 
              <div>
                <img className='commentPic' src={`http://${child.photoUrl}`}/>
                <p className='commentUser'>{child.userHandle}</p>
                <p className='commentBody'>{child.body}</p>
              </div>
            )
            :
            <div/>
          }
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


