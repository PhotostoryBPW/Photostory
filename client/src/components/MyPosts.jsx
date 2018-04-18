import React from 'react';
import Post from './Post.jsx';

const MyPosts = (props) => {

  return (
  <div className="myPosts">
    <div>
      {  
      props.posts.length > 0  
      ?
      props.posts.map(post => 
        (post.users_id === props.user.id) &&
         <Post key={post.id} post={post} view='profile'/>
      )
      :
      <div>
        No posts to display.
      </div>
      }
    </div>
  </div>
  );
}

export default MyPosts;
