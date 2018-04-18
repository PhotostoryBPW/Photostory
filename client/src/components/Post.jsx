import React from 'react';
import PostHeader from './PostHeader.jsx';
import moment from 'moment';
import axios from 'axios';


class Post extends React.Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);

    this.state = {
      post: this.props.post,
      username: '',
      clicked: false,
      commentText: '',
      children: this.props.post.children || '',
      view: this.props.view 
    }
    
    this.onSubmitCommentHandler = this.onSubmitCommentHandler.bind(this);
    console.log('props from POST', this.props);
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

  renderComment() {
    if (this.state.clicked === true) {
      return <div><input ref={(input) => { this.nameInput = input; }} onChange={this.onTypeHandler.bind(this)}/><button onClick={this.onSubmitCommentHandler}>POST</button></div> 
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
      </div>
    );
  }
}

export default Post;


