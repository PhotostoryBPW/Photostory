import React from 'react';
import Post from './Post.jsx';
import Thumbnail from './Thumbnail.jsx';

class ProfilePosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postView: 'postThumbs',
      post: ''
    }
  };

  onPostThumbClickHandler(e) {
    this.setState({post: e})
    console.log('this is e', e);
  }

  onPostViewClickHandler(e) {
    this.setState({
      postView: e.target.id,
      post: '',
    })
  };

  render () {
    console.log('PROFILE POSTS PROPS: ', this.props)
    console.log('PROFILE POSTS STATE.POST: ', this.state.post)
    return (
    <div className="profilePosts">
      <div className='profileViewContainer'>
        <div id="postThumbs" className="buttonGrey" onClick={this.onPostViewClickHandler.bind(this)}><img src="http://localhost:3000/img/grid.png"/></div>
        <div id="postFeed" className="buttonGrey" onClick={this.onPostViewClickHandler.bind(this)}><img src="http://localhost:3000/img/feed.png"/></div>  
      </div>
      <div>
        {
        this.props.posts.length === 0  
        ?
        <div>
          No posts to display.
        </div>
        :
        this.state.postView === 'postThumbs' && !this.state.post
        ?
        this.props.posts.map(post => 
          <Thumbnail key={post.id} post={post} onClick={this.onPostThumbClickHandler.bind(this)} />
        )
        :
        this.state.postView === 'postFeed' && !this.state.post
        ?
        this.props.posts.map(post =>
          <Post key={post.id} post={post} view={this.props.view} userPhotoUrl={this.props.userPhotoUrl} userHandle={this.props.userHandle}/>
        )
        :
        <Post post={this.state.post} view={this.props.view} userPhotoUrl={this.props.userPhotoUrl} userHandle={this.props.userHandle}/>  
        }
      </div>
    </div>
    );
  };
}

export default ProfilePosts;
