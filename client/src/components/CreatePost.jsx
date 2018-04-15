import React from 'react';
import axios from 'axios';
import dropzone from 'dropzone';
import cloudinary from 'cloudinary-react';

class CreatePost extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      body: '',
      location: '',
      filt: 'nofilter'
    }

    dropzone.options.myDropzone = {

      // Prevents Dropzone from uploading dropped files immediately
      autoProcessQueue: false,
      uploadMultiple: true,
      parallelUploads: 100,
      maxFiles: 1,    
      
      init: function() {
        
        var submitButton = document.querySelector("#submit-all")
        myDropzone = this; // closure
        
        submitButton.addEventListener("click", function() {
          myDropzone.processQueue(); // Tell Dropzone to process all queued files.
        });
        
        // You might want to show the submit button only when 
        // files are dropped here:
        this.on("addedfile", function() {
        // Show submit button here and/or inform user to click it.
        });
        
        this.on("processing", function(file) {
            this.options.url = "/some-other-url";
        });

        var _this = this;

        // Setup the observer for the button.
        document.querySelector("button#clear-dropzone").addEventObserver("click", function() {
          // Using "_this" here, because "this" doesn't point to the dropzone anymore
          _this.removeAllFiles();
          // If you want to cancel uploads as well, you
          // could also call _this.removeAllFiles(true);
        });  
      }
    };
  }
  
  onSubmitPostClickHandler() {
    console.log('we are submitting the post: ')
    axios.post(`api/post/`, {
      params: {
        user_id: 25,  
        body: this.state.body,
        postLoc: this.state.location,
        photoUrl: `source.unsplash.com/1600x900/?featured/?dog,cat`,
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
        <form action="/file-upload" className="dropzone" id="post-dropzone">
        Drop image/video here to add to post.
        <input type="file" name="file" />
        </form>
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
        <button onClick={this.onSubmitPostClickHandler.bind(this)}>Post</button>
      </div>
    );
  }
}

export default CreatePost;


