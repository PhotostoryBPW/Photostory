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

  onFollowClickHandler(e) {
    console.log('the state of this on click ', this.state, 'and the value of e on click'. e);
    axios.post('api/follow', this.props.note.users_id)
    .then((response) => {
        if (!this.state.followed) {
          var userInfoUpdated = Object.assign({}, this.state.userInfo, {followedCount: ++this.state.userInfo.followedCount});
          console.log('top question', userInfoUpdated);
          this.setState({
            followed: !this.state.followed,
            userInfo: userInfoUpdated
          })
        } else {
          var userInfoUpdated = Object.assign({}, this.state.userInfo, {followedCount: --this.state.userInfo.followedCount});
          console.log('bottom questions' , userInfoUpdated);
          this.setState({
            followed: !this.state.followed,            
            userInfo: userInfoUpdated
          })
        }
      console.log('reached the server successfully', response)
    })
    .catch((err) => {
      console.log(err);
    })
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
            <div>
              {this.props.note.userHandle} is following you.
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
              {this.props.note.userHandle} is following you.
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
              {this.props.note.userHandle} is following you.
            </div>
            <div className='noteMoment'>
              {moment(this.props.note.note_time).fromNow()}
            </div>
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
