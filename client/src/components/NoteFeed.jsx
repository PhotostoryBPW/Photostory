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
          <Note />
      </div>  
    )
  }
}

export default NoteFeed;
