import React from 'react';
import Post from './Post.jsx';

class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: '',
      users: '',
    }
    console.log('this is the props view from feed: ', this.props.view)
  }

  render() {
    return (
      <div>
        {  
        this.props.posts.length > 0
        ?
        this.props.posts.map(post =>  
          <Post key={post.ID} post={post} view={this.props.view}/>
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
