import React from 'react';
import Post from './Post.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: {},
      children: '',
    };
    console.log('this is the props view from feed: ', this.props.view);
    console.log('this is the props for feed: ', this.props.posts);
  }

  render() {
    return (
      <div>
        {  
        this.props.posts.length > 0
        ?
        this.props.posts.map(post =>
          !post.parent_id  
          ?
          <Post key={post.id} post={post} view={this.props.view} liked={this.props.liked}/>
          :
          <div/>
        )
        :
        <div>
          No posts to display.
        </div>
        }
        {console.log('props liked in feed ', this.props.liked)}
      </div>
    )
  }
}

export default Feed;
