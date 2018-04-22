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
  }

  onComponentDidUpdate() {
    this.setState({
      posts: this.props.posts,
    })
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
          <Post handleClick={this.props.handleClick} key={post.id} post={post} view={this.props.view} userPhotoUrl={this.props.userInfo.userPhotoUrl}/>
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
