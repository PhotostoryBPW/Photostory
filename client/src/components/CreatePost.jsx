import React from 'react';
import axios from 'axios';
import cloudinary from 'cloudinary-react';
import dotenv from 'dotenv'
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
      url: ''
    }

  }
  
  onSubmitPostClickHandler() {
    console.log('we are submitting the post: ')
    function onDrop(acceptedFiles, rejectedFiles) {
      console.log(acceptedFiles);
    }

    axios.post(`api/post/`, {
      params: {
        user_id: 25,  
        body: this.state.body,
        postLoc: this.state.location,
        photoUrl: this.state.url,
        createdAt: Date.now(),
        filt: this.state.filt,
      }
    })
    .then( response => {
      console.log('response', response)
      this.setState({ 
        searchData: response.data
      })
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  showSubmit(url) {
    this.setState({showSubmit: true});
    this.setState({url: url});
    console.log(this.state);
  }

  onBodyChangeHandler(e) {
    this.setState({body: e.target.value})  
    console.log(this.state.search);
  }
  onLocationChangeHandler(e) {
    this.setState({location: e.target.value})  
    console.log(this.state.search);
  }

  onFilterClickHandler(e) {
    console.log('this is the click on filter: ', e.target.className);
    this.setState({filt: e.target.className});
  }

  render() {
    return (
      <div>
        <Zone drop={this.showSubmit.bind(this)} />
        <div className='filters'>
          <div className='nofilter' onClick={this.onFilterClickHandler.bind(this)}></div>
          <div className='blackAndWhite' onClick={this.onFilterClickHandler.bind(this)}></div>
          <div className='sepia' onClick={this.onFilterClickHandler.bind(this)}></div>
          <div className='vibrant' onClick={this.onFilterClickHandler.bind(this)}></div>
          <div className='fadeout' onClick={this.onFilterClickHandler.bind(this)}></div>
          <div className='portrait' onClick={this.onFilterClickHandler.bind(this)}></div>
        </div>  
        <textarea className='postBody' name='postBody' type='textbody' onChange={this.onBodyChangeHandler.bind(this)}/>
        <input className='location' name='location' type='text' onChange={this.onLocationChangeHandler.bind(this)}/>
        <button id="#submit-all" onClick={this.onSubmitPostClickHandler.bind(this)} style={this.state.showSubmit ? {display: 'block'} : {display: 'none'}} >Post</button>
      </div>
    );
  }
}

export default CreatePost;


