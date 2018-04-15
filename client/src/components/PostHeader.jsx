import React from 'react';

const PostHeader = (props) => {
  console.log('props in PostHeader: ', props);
  return 
    <div>
      <div className='userImage'><img src={`http://${this.props.post.userPhotoUrl}`}/></div>
      <div className='userHandle'>{this.props.post.userHandle}</div><br/> 
    </div>
}

export default PostHeader;