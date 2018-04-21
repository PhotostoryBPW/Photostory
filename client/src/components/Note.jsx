import React from 'react';
import moment from 'moment';


class Note extends React.Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);

    this.state = {
      post: '',
      clicked: false
    }
  }



  clickHandler(e) {
    // console.log(this);
    // this.props.onClick(this.props.post)
  }

  render() {
    return (
    <div>
        {/* 0 = comment, 1 = follow, 2 = like */}
        {
        this.props.note.noteType === 0
        ?
        <div className='notification'>
          <div className='noteThumb' onClick={this.clickHandler}>
            <img src={`http://${this.props.note.photoUrl || this.props.note.userPhotoUrl}`}/>
          </div>
          <div className='noteText' onClick={this.clickHandler}>
            {this.props.note.userHandle} has commented on your post.
          </div>    
        </div>    
        :
        this.props.note.noteType === 1
        ?
        <div className='notification'>
          <div className='noteThumb' onClick={this.clickHandler}>
            <img src={`http://${this.props.note.photoUrl || this.props.note.userPhotoUrl}`}/>
          </div>
          <div className='noteText' onClick={this.clickHandler}>
            {this.props.note.userHandle} has liked your post.
          </div>    
        </div>   
        :
        this.props.note.noteType === 2
        ?
        <div className='notification'>
          <div className='noteThumb' onClick={this.clickHandler}>
            <img src={`http://${this.props.note.photoUrl || this.props.note.userPhotoUrl}`}/>
          </div>
          <div className='noteText' onClick={this.clickHandler}>
            {this.props.note.userHandle} is following you.
          </div>    
          <button className='followBack button'>Follow Back</button>
        </div>
        :
        <div/>   
      }   
    </div>  
    );
  }
}

export default Note;
