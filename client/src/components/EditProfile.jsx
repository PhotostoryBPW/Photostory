import React from 'react';
import axios from 'axios';
import cloudinary from 'cloudinary-react';
import Zone from './Zone.jsx';
import Dropzone from 'react-dropzone';
import config from '../config.js';

class EditProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fields:  ["Name", "Username", "Location", "Bio", "Email"],
      fieldKeys: {"Name":"userName", "Username":"userHandle", "Location":"userLoc", "Bio":"bio", "Email":"email"},
      userInfo: {},
      temp: {},
      selectedField: '',
      showInput: false,
      showDropzone: true,
    }
    this.handlePencilClick = this.handlePencilClick.bind(this);
    this.handleSaveClick = this.handleSaveClick.bind(this);
    this.handleFormChange = this.handleFormChange.bind(this);
};

componentDidMount() {
  axios.get('http://localhost:3000/api/info', this.props.user)
  .then (response => {
    this.setState({userInfo: response.data[0]})
  })
  .catch (err => {
    console.log(err);
  })
}

createFields() {
  return this.state.fields.map(field => {
    return <div key={Math.floor((Math.random() * 10000000) + 1)} className="attributeRow" id={field === "Username" ? "changeNote" : "none"}>
    <span className="userAttribute">{field}: </span>
    {
      this.state.showInput && this.state.selectedField === field ? 
      <span className="profileEdit">
      <input className="profEditInput" maxLength={field === 'Bio' ? "500" : "25"} type="text" name={field} autoFocus defaultValue={this.state.userInfo[this.state.fieldKeys[field]]} onChange={this.handleFormChange}/>
      <span onClick={() => this.handleSaveClick(field)} className="saveProfIcon"><a href="#"><i className="fa fa-save fa-lg"></i></a></span>
      </span>
      :
      <span className="profileEdit">
      <span className="userAttributeValue">{this.state.userInfo[this.state.fieldKeys[field]]}</span>
      <span onClick={() => this.handlePencilClick(field)} className="editProfIcon"><a href="#"><i className="fa fa-pencil fa-lg"></i></a></span>
      </span>
    }
    <span id="note"> * Changing your username will require you to log back in</span>
    </div>
  });
}

handlePencilClick(field) {
  this.setState({showInput: true, selectedField: field});
}

handleSaveClick(field) {
  var data = [ this.state.fieldKeys[field], this.state.temp];
  if (data[0] === "userHandle") {
    data[1] === this.state.userInfo.userHandle || !data[1].length ? this.setState({showInput: false}) : this.props.handleLogout('true', data[1], this.state.userInfo.userHandle);
  } else {
  axios.put('/api/updateprofile/', data)
    .then(response => {
      this.state.userInfo[data[0]] = data[1];
      this.setState({
        showInput: false,
        selectedField: '',
      })
    })
    .catch(err => {
      console.log(err)
    })
  }
}

handleFormChange(e) {
  console.log('value ', e.target.value)
  this.setState({temp: e.target.value});
}

harvestProfileUrl(url) { 
  var payload = {
    userPhotoUrl: url
  }
  axios.put('/api/updateprofilepic/', payload)
  .then(response => {
    console.log('this is the response to the harvest profile url function: ', response.data.userPhotoUrl);
    this.setState({
      userPhotoUrl: response.data.userPhotoUrl,
      showDropzone: false,
    });
  })
  .catch(err => {
    console.log(err);
  })
}

toggleDropzone() {
  this.state.showDropzone = !this.state.showDropzone;
}

render() {
    return(
        <div>
          <div>
            {
            this.state.showDropzone ?
            <Zone toggleDropzone={this.toggleDropzone.bind(this)} drop={this.harvestProfileUrl.bind(this)}/>
            :
            <div onClick={this.toggleDropzone.bind(this)}>
                <img className='editProfilePic' src={this.state.userInfo.userPhotoUrl}/>
                <span className='centerText'>Click to update profile pic</span>
            </div>  
            }
          </div>
          <div id="profileFields">
          {this.createFields()}
          </div>
        </div>
    )
  }
}

export default EditProfile;