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
      <div className='noteText' onClick={this.clickHandler}>
        {this.props.note.userHandle} 
      </div>
        
      <div className='noteThumb' onClick={this.clickHandler}>
        <img src={`http://${this.props.note.photoUrl || this.props.note.userPhotoUrl}`}/>
      </div>
    </div>  
    );
  }
}

export default Note;
