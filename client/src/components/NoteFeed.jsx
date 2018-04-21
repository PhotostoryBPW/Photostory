import React from 'react';
import Post from './Post.jsx';
import Note from './Note.jsx';

class NoteFeed extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: '',
      users: '',
      children: '',
    };

  }

  onComponentDidUpdate() {

  }
 
  render(props) {
    return (
      <div>
        {
        this.props.notes.length > 0
        ?
        this.props.notes.map(note =>
          <Note key={note.note_time} note={note} />
          // <Post handleClick={this.props.handleClick} key={post.id} post={post} view={this.props.view} liked={this.props.liked} currentUserProfilePhoto={this.props.userInfo.userPhotoUrl}/>
        )
        :
        <div>
            No notifications to display.
        </div>
        
        }
      </div>  
    )
  }
}

export default NoteFeed;
