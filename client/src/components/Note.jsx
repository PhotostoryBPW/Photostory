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
        This is notificaitons text
        {/* <img src={`http://${this.props.post.photoUrl}`}/> */}
      </div>
        
      <div className='noteThumb' onClick={this.clickHandler}>
      This is a notification image thumb
        {/* <img src={`http://${this.props.post.photoUrl}`}/> */}
      </div>
    </div>  
    );
  }
}

export default Note;
