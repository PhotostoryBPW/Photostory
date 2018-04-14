
import React from 'react';
import moment from 'moment';


class Thumbnail extends React.Component {
  constructor(props) {
    super(props);
    
    this.clickHandler = this.clickHandler.bind(this);

    this.state = {
      post: '',
      clicked: false
    }
  }



  clickHandler(e) {
    console.log(this);
    this.props.onClick(this.props.post)
  }

  render() {
    return (
      <div className='thumb' onClick={this.clickHandler}>
        <img src={`http://${this.props.post.photoUrl}`}/>
      </div>
    );
  }
}

export default Thumbnail;

// onClick={this.onPostThumbClickHandler.bind(this)}