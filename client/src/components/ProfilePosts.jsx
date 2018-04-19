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
    this.setState({postView: e.target.className})
  };

  render () {
    return (
    <div className="profilePosts">
      <div className="postThumbs" onClick={this.onPostViewClickHandler.bind(this)}>VIEW THUMBS</div>
      <div className="postFeed" onClick={this.onPostViewClickHandler.bind(this)}>VIEW FEED</div>
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
          <Thumbnail post={post} onClick={this.onPostThumbClickHandler.bind(this)} />
        )
        :
        this.state.postView === 'postFeed' && !this.state.post
        ?
        this.props.posts.map(post =>
          !post.parent_id  
          ?
          <Post key={post.id} post={post} view={'ProfileView'} />
          :
          <div/>
        )
        :
        <Post post={this.state.post} liked={this.props.liked} view={this.props.view}/>  
        }
      </div>
    </div>
    );
  };
}

export default ProfilePosts;
