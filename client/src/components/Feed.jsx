import React from 'react';
import Post from './Post.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: '',
      users: '',
    }
  }

  getLikes() {
    if (this.props.liked.indexOf(this.props.posts.ID) > -1) {
      
    }
  }

  render() {
    return (
      <div>
        {  
        this.props.posts.length > 0
        ?
        this.props.posts.map(post =>  
          <Post key={post.ID} post={post} liked={this.props.liked} />
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
