import React from 'react';
import moment from 'moment';
import axios from 'axios';


class Note extends React.Component {
  constructor(props) {
    super(props);
    // 0 = comment, 1 = follow, 2 = like 

    this.state = {
      post: '',
      clicked: false,
      followed: false,
    }
    var that = this;
  }

  onFollowClickHandler() {
      console.log('this is the note component: ', this);
      console.log('this is the props in the note component', this.props);
      console.log('this is the params we are sending to follow from notifications', this.props.note.follows_id);
    var del = this.props.note.id;
    axios.post('api/follow', {[this.props.note.follows_id]:''})
    .then((response) => {
      console.log('reached the server successfully', response)
      this.setState({followed: true});
      this.deleteNotification(del);
    })
    .catch((err) => {
      console.log(err);
    })  
    
    
   }

   deleteNotification(del) {
    console.log('this is the params for delete!: ', {
        config: {id: del}}
    )
    axios({
        method: 'delete',
        url: `${'api/notifications/destroy'}`, 
        data: {config: {id: del}},
        headers: {'Content-Type': 'application/json'},
    })
    .then((response) => {
      console.log('removed follow notification from feed', response);
    })
    .catch((err) => {
      console.log(err);
    })    
   }
  

  render() {
    return (
    <div>
        {
        this.props.note.noteType === 0
        ?
        <div className='notification'>
          <div className='noteThumb' onClick={this.clickHandler}>
            <img src={`http://${this.props.note.photoUrl || this.props.note.userPhotoUrl}`}/>
          </div>
          <div className='noteText' onClick={this.clickHandler}>
            <div>
              <div className='userHandle'>{this.props.note.userHandle}</div> commented on your post.
            </div>
            <div className='noteMoment'>
              {moment(this.props.note.note_time).fromNow()}
            </div>
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
            <div >
              <div className='userHandle'>{this.props.note.userHandle}</div> likes your post.
            </div>
            <div className='noteMoment'>
              {moment(this.props.note.note_time).fromNow()}
            </div>
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
            <div >
              <div className='userHandle'>{this.props.note.userHandle}</div> is following you.
            </div>
            <div className='noteMoment'>
              {moment(this.props.note.note_time).fromNow()}
            </div>
          </div>
          {
          !this.state.followed
          ?
          <button className='followBack button' onClick={this.onFollowClickHandler.bind(this)}>Follow Back</button>
          :
          <button className='followBack button following'>Following</button>
          }
        </div>
        :
        <div/>   
      }   
    </div>  
    );
  }
}

export default Note;
