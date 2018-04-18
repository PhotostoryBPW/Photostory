import React from 'react';

const PostHeader = (props) => {
    return (
    <div>
      <div className='userImage'><img src={`http://${props.userPhotoUrl}`}/></div>
      <div className='userHandle'>{props.userHandle}</div><br/> 
    </div>
    );
}

export default PostHeader;