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
    
  }
  
  checkLike() {
    if (this.props.liked.indexOf(this.props.post.id) > -1) {
      this.state.hasLiked = true;
    } else {
      this.state.hasLiked = false;
    }
  }

  
  componentDidUpdate() {
    console.log('children in post', this.state.children);
  }

  componentDidMount() {
    this.setState({children: this.props.post.children});
  }

  onSubmitCommentHandler() {
    var oldChildrenState;
    axios.post(`api/comment/`, {
      params: {
        users_id: null,  
        body: this.state.commentText,
        postLoc: null,
        createdAt: Date.now(),
        filt: null,
        parent_id: this.props.post.id
      }
    })
    .then( response => {
      console.log('this is the PARENT ID of a comment', this.props.post.id)
      oldChildrenState = this.state.children;
      console.log('response config data', response.config.data);
      this.setState({clicked: false})
      console.log('this is old children state before updating', oldChildrenState);
      // JSON.parse(response.config.data.userPhotoUrl).userPhotoUrl = this.props.post.userPhotoUrl
      if (!!oldChildrenState && oldChildrenState.length > 0) {
        oldChildrenState.push((JSON.parse(response.config.data)).params);
      } else {
      oldChildrenState = [JSON.parse(response.config.data).params];
      }
    })
    .then( () => {
      oldChildrenState[oldChildrenState.length-1].userPhotoUrl = this.props.currentUserProfilePhoto;
      console.log('this is old children state updated', oldChildrenState);
    })
    .then( () => {
      console.log('this is the new children state right before updating', oldChildrenState);
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
      return <div><input autoFocus onChange={this.onTypeHandler.bind(this)}/><button onClick={this.onSubmitCommentHandler}>POST</button></div> 
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

  profileOrThumbnailClickHandler() {
    console.log('clicked!');
    //on click, go to profile page
    this.props.handleClick('profile', this.props.post.userHandle);
    //make a call to app to change the view to profile
  }

  render() {
    return (
      <div className='postMain'>
        <div> 
          <div> {
            !!this.state.post && this.state.view !== 'profile' ?
            <PostHeader userPhotoUrl={this.props.post.userPhotoUrl} userHandle={this.props.post.userHandle} clickHandler={this.profileOrThumbnailClickHandler.bind(this)}/> 
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
            <button className="buttonRed" onClick={this.addCommentClickHandler}>
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
        </div>
        <div>  
          {
            !!this.state.children && !!this.state.children.length ?
            this.state.children.map(child => 
              <div className='entireComment'>
                <img className='commentPic' src={`http://${child.userPhotoUrl}`}/>
                <div className='commentUser'>{child.userHandle}</div>
                <div className='commentBody'>{child.body}</div>
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


