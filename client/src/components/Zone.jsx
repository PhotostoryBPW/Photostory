import React from 'react';
import axios from 'axios';
import cloudinary from 'cloudinary-react';
import Dropzone from 'react-dropzone';
import config from '../config.js';

// const {CLOUDINARY_URL} = process.env 
//  {UPLOAD_PRESET}, {CLOUDINARY_SECRET} = process.env;

class Zone extends React.Component {
    constructor(props) {
      super(props)
      this.state = {
        accepted: [],
        rejected: []
      }
    }
    
    onDrop(accepted, rejected) {
      this.setState({ accepted, rejected })

      

      const uploaders = accepted.map(file => {
        // Initial FormData
        const formData = new FormData();
        formData.append('file', file);
        formData.append('upload_preset', config.UPLOAD_PRESET); // Replace the preset name with your own
        formData.append('api_key', config.CLOUDINARY_API); // Replace API key with your own Cloudinary key
        formData.append('timestamp', (Date.now() / 1000) | 0);
        
        // Make an AJAX upload request using Axios (replace Cloudinary URL below with your own)
        return axios.post(config.CLOUDINARY_URL, formData, {
          headers: { 'X-Requested-With': 'XMLHttpRequest' },
        })
        .then(response => {
          const data = response.data;
          const fileURL = data.secure_url // You should store this URL for future references in your app
          console.log('this is the data from the dropzone,', data);
          this.props.drop(data.url.split('http://').join(''));
        })
      });
    
      // Once all the files are uploaded 
      // axios.post(uploaders).then(() => {
        
      // });
    }
    
  
    render() {
      return (
        <section>
          <div className="dropzone">
          <button onClick={this.props.leaveDropZone} >go back</button>
            <Dropzone accept="image/jpeg, image/png" 
                      onDrop={this.onDrop.bind(this)}
                      className={'dropbox'} 
                      activeClassName={'active'} 
                      rejectClassName={'reject'}>
              <p>Try dropping some files here, or click to select files to upload.</p>
              <p>Only *.jpeg and *.png images will be accepted</p>
            </Dropzone>
          </div>
          <aside>
          <h2>Accepted files</h2>
          <ul>
            {
              this.state.accepted.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
          <h2>Rejected files</h2>
          <ul>
            {
              this.state.rejected.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
        </section>
      );
    }
  }

  export default Zone;