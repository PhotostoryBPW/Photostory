import React from 'react';
import Post from './Post.jsx';
import Thumbnail from './Thumbnail.jsx';

class MyPosts extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      postView: 'postThumbs',
      post: ''
    }
  };
  
  onPostThumbClickHandler(e) {
    this.setState({post: e})
    console.log(e);
  }

  onPostViewClickHandler(e) {
    this.setState({postView: e.target.className})
  };

  render () {
    return (
    <div className="myPosts">
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
        this.state.postView === 'postThumbs'
        ?
        this.props.posts.map(post => 
          <Thumbnail post={post} onClick={this.onPostThumbClickHandler.bind(this)} />
        )
        :
        this.state.postView === 'postFeed'
        ?
        this.props.posts.map(post =>
          !post.parent_id  
          ?
          <Post key={post.id} post={post} view={'ProfileView'} />
          :
          <div/>
        )
        :
        <div/>
        }
      </div>
    </div>
    );
  };
}

export default MyPosts;
