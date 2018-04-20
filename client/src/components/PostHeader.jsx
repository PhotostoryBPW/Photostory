import React from 'react';

const PostHeader = (props) => {
    return (
    <div>
      <div className='userImage' onClick={props.clickHandler}><img src={`http://${props.userPhotoUrl}`}/></div>
      <div className='userHandle'onClick={props.clickHandler}>{props.userHandle}</div><br/> 
    </div>
    );
}

export default PostHeader;

// onClick={this.props.clickHandler}