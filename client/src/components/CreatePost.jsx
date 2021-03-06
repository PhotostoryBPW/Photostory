import React from 'react';
import axios from 'axios';
import cloudinary from 'cloudinary-react';
import Zone from './Zone.jsx';
import Dropzone from 'react-dropzone';
import config from '../config.js';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
  
    this.state = {
      showSubmit: false,
      body: '',
      location: '',
      filt: 'nofilter',
      accepted: [],
      rejected: [],
      photoUrl: '',
      thumbs: "localhost:3000/img/defaultPost.jpg",
      showDropzone: true,
    }

  }
  
  onSubmitPostClickHandler() {
    console.log('we are submitting the post: ')
    function onDrop(acceptedFiles, rejectedFiles) {
      console.log(acceptedFiles);
    }

    axios.post(`api/post/`, {
      params: {
        users_id: null,  
        body: this.state.body,
        postLoc: this.state.location,
        photoUrl: this.state.photoUrl,
        createdAt: Date.now(),
        filt: this.state.filt,
      }
    })
    .then (() => {
      this.props.onSubmit('feed');
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  showSubmit(url) {
    this.setState({
      showSubmit: true,
      photoUrl: url,
      showDropzone: false,
    });
    console.log(this.state);
  }

  onBodyChangeHandler(e) {
    this.setState({body: e.target.value})  
  }

  onLocationChangeHandler(e) {
    this.setState({location: e.target.value}) 
  }

  onFilterClickHandler(e) {
    console.log('this is the click on filter: ', e);
    this.setState({filt: e});
  }

  render() {
    return (
      <div className="createPost">
        <div>
          {
            this.state.showDropzone ?
            <Zone drop={this.showSubmit.bind(this)} />
            :
            <img className={`newPostImage ${this.state.filt}`} src={`http://${this.state.photoUrl}`}/>
          }
        </div>
        <div className='filters'>
          <div className='nofilter' onClick={this.onFilterClickHandler.bind(this, 'nofilter')}><img className='createPostThumb' src={`http://${this.state.thumbs}`}/> </div>
          <div className='blackAndWhite' onClick={this.onFilterClickHandler.bind(this, 'blackAndWhite')}><img className='createPostThumb' src={`http://${this.state.thumbs}`}/></div>
          <div className='sepia' onClick={this.onFilterClickHandler.bind(this, 'sepia')}><img className='createPostThumb' src={`http://${this.state.thumbs}`}/></div>
          <div className='vibrant' onClick={this.onFilterClickHandler.bind(this, 'vibrant')}><img className='createPostThumb' src={`http://${this.state.thumbs}`}/></div>
          <div className='fadeOut' onClick={this.onFilterClickHandler.bind(this, 'fadeOut')}><img className='createPostThumb' src={`http://${this.state.thumbs}`}/></div>
          <div className='portrait' onClick={this.onFilterClickHandler.bind(this, 'portrait')}><img className='createPostThumb' src={`http://${this.state.thumbs}`}/></div>
        </div>  
        <br />
        <div id='createInputs'>
        <textarea input name='postBody' rows="2" cols="70" maxLength="500" type='textbody' onChange={this.onBodyChangeHandler.bind(this)}/>
        <br />
         Enter your comments
         <br />
         <br />
        <input name='location' size="30" type='text' maxLength="50" onChange={this.onLocationChangeHandler.bind(this)}/>
        <br />
         Location
        <br />
        </div>
        <button id="#submit-all" className="buttonLight" onClick={this.onSubmitPostClickHandler.bind(this)} style={this.state.showSubmit ? {display: 'block'} : {display: 'none'}} >CREATE POST</button>
      </div>
    );
  }
}

export default CreatePost;


