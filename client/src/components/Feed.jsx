import React from 'react';



class Feed extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: '',
    }
  }
  
  render() {
    return (
      <div>
        {  
        !!this.state.posts.length
        ?
        this.state.posts.map(post =>     
        <Post post={post}/>
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
