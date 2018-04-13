import React from 'react';
import Post from './Post.jsx';


class Feed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: '',
      users: ''
    }
  }
  
  componentDidMount() {
    this.setState({
      posts: this.props.posts,
      users: this.props.users
    })
  }

  render() {
    console.log(this.props.posts);
    return (
      <div>
        {  
        this.props.posts.length > 0
        ?
        this.props.posts.map(post =>  
          <Post key={post.ID} post={post}/>
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
