import React from 'react';
import Post from './Post.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: '',
      users: '',
      children: '',
    };
    console.log('this is the props view from feed: ', this.props.view);
    console.log('this is the props for feed: ', this.props.posts);
  }

  render(props) {
    return (
      <div>
        {  
        this.props.posts.length > 0
        ?
        this.props.posts.map(post =>
          !post.parent_id  
          ?
          <Post key={post.id} post={post} view={this.props.view} liked={this.props.liked} currentUserProfilePhoto={this.props.userInfo.userPhotoUrl}/>
          :
          <div/>
        )
        :
        <div>
          No posts to display.
        </div>
        }
      </div>
    )
  }
}

export default Feed;
