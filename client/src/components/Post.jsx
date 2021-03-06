import React from 'react';
import axios from 'axios';
import PostHeader from './PostHeader.jsx';
import moment from 'moment';

class Post extends React.Component {
  constructor(props) {
    super(props);
    
    this.addCommentClickHandler = this.addCommentClickHandler.bind(this);
    this.onSubmitCommentHandler = this.onSubmitCommentHandler.bind(this);

    this.state = {
      post: this.props.post,
      username: '',
      clicked: false,
      commentText: '',
      children: this.props.post.children || '',
      view: this.props.view,
      hasLiked: '',
      likesCount: this.props.post.likesCount
    }
    
  }

  getLikes() {
    axios.get('api/likes')
      .then( response => {
        var postIDs = [];
        if (response.data.length) {
          response.data.forEach(post => {
            postIDs.push(post.posts_id);
          });
            
          if (postIDs.indexOf(this.props.post.id) > -1) {
            this.setState({hasLiked: true});
          } else {
            this.setState({hasLiked: false});
          }
        }
      })
      .catch(err => {
        console.log(err);
      })
  }

  componentDidMount() {
    this.setState({children: this.props.post.children});
    this.getLikes();
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
        parent_id: this.props.post.id,
      }
    })
    .then( response => {
      console.log('this is the state on a comment handler submit thingy: ', this.state)
      console.log('what is this.props on submit post', this.props)
      oldChildrenState = this.state.children;
      this.setState({clicked: false})
      // JSON.parse(response.config.data.userPhotoUrl).userPhotoUrl = this.props.post.userPhotoUrl
      if (!!oldChildrenState && oldChildrenState.length > 0) {
        oldChildrenState.push((JSON.parse(response.config.data)).params);
      } else {
      oldChildrenState = [JSON.parse(response.config.data).params];
      }
    })
    .then( () => {
      oldChildrenState[oldChildrenState.length-1].userPhotoUrl = this.props.userPhotoUrl;
      oldChildrenState[oldChildrenState.length-1].userHandle = this.props.userHandle;
      console.log('this is old children state updated', oldChildrenState);
    })
    .then( () => {
      this.setState({children: oldChildrenState});
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  onTypeHandler(e) {
    this.setState({commentText: e.target.value});
  }
  
  setLike() {
    this.setState({hasLiked : true});
    axios.post('api/like', this.props.post.id)
      .then( response => {
        console.log('post success');
        this.setState({likesCount: this.state.likesCount + 1})
      })
      .catch( err => {
        console.log(err);
      })
  }
  clearLike() {
    this.setState({hasLiked : false});
    axios.post('api/unlike', this.props.post.id)
      .then( response => {
        this.setState({likesCount: this.state.likesCount - 1})
        console.log('post success');
      })
      .catch( err => {
        console.log(err);
      })
  }

  renderComment() {
    if (this.state.clicked === true) {
      return <div><input autoFocus onChange={this.onTypeHandler.bind(this)}/> <button onClick={this.onSubmitCommentHandler}>POST</button> <button onClick={this.addCommentClickHandler}>CANCEL</button></div>
    } else {
      return 'Add a comment'
    }    
  }

  renderLikeButton() {
    if (this.state.hasLiked === true) {
      return <div><button className="buttonLight like" onClick={this.clearLike.bind(this)}><span className="tooltiptext">You have already liked this post</span><img className='likebtn' src="http://localhost:3000/img/liked-w.png"/></button></div>
    } else {
      return <div><button className="buttonLight like" onClick={this.setLike.bind(this)}><span className="tooltiptext">Like this post</span><img className='likebtn' src="http://localhost:3000/img/like-w.png"/></button></div>
    }
  }

  addCommentClickHandler() {
    this.state.clicked === true ? this.setState({clicked: false}) : this.setState({clicked: true});
  } 

  profileOrThumbnailClickHandler() {
    this.props.handleClick('profile', this.props.post.userHandle);
  }

  render() {
    return (
      <div className='postMain'>
        <div className="postHeader"> {
          !!this.state.post && this.state.view !== 'profile' ?
          <PostHeader key={this.props.post.id} userPhotoUrl={this.props.post.userPhotoUrl} userHandle={this.props.post.userHandle} clickHandler={this.profileOrThumbnailClickHandler.bind(this)}/> 
          :
          <div></div>
        }
        </div>
        <div className='postLocation'>  
          {this.props.post.postLoc}
        </div>
        <div className={`postImage ${this.props.post.filt}`}>
          <img src={`http://${this.props.post.photoUrl}`}/>
        </div>
        <div className='postOptions'>
          <div className="tooltip">
            {this.renderLikeButton()}
          </div>
          <div className='addComment tooltip'>
            <button className="buttonLight" onClick={this.addCommentClickHandler}>
              <span className="tooltiptext">Comment on this post</span> 
              <img className='commentbtn' src="http://localhost:3000/img/comment-w.png"/>
            </button>
          </div>
          {/* <div className='share tooltip'>
            <button className="buttonLight">
              <span className="tooltiptext">Share this post</span>
              SHARE
            </button>
          </div> */}
        </div>  
        <div className='likes'>
          Liked by {this.state.likesCount || this.props.post.likesCount} story tellers
        </div>
        
        <div className='body'>
          "{this.props.post.body}"
        </div>
        
        <div className='addComment' onClick={this.addCommentClickHandler}>
          {this.renderComment()}
        </div>
        <div>  
          {
            !!this.state.children && !!this.state.children.length ?
            this.state.children.map(child => 
              <div className='entireComment' key={Math.floor((Math.random() * 10000000) + 1)}>
                <img className='commentPic' src={`http://${child.userPhotoUrl}`}/>
                <div className='commentUser'>{child.userHandle}</div>
                <div className='commentBody'>"{child.body}"</div>
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
      </div>
    );
  }
}

export default Post;