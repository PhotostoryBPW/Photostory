import React from 'react';
const axios = require('axios');

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      fullname: '',
      email: '',
      toggleUsernameTakenMessage: false,
      toggleAccountSuccessfullyCreatedMessage: false
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleFullnameChange = this.handleFullnameChange.bind(this);
    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleFullnameChange(e) {
    this.setState({fullname: e.target.value});
  }

  handleEmailChange(e) {
    this.setState({email: e.target.value});
  }

  handleSignup() {
    var payload = 
    {
      username: this.state.username, 
      password: this.state.password,
      fullname: this.state.fullname, 
      email: this.state.email,
      userPhotoUrl: 'localhost:3000/anonymous.png'
    }
    console.log(payload);
    axios.post('http://localhost:3000/api/signup/', payload)
    .then((response) => {
      if (response.data === 'username already exists') {
        this.setState({toggleUsernameTakenMessage: true});
        this.setState({toggleAccountSuccessfullyCreatedMessage: false});
        // this.props.isLoggedInHandler();
        console.log('username already exists');
      } else {
        this.setState({toggleUsernameTakenMessage: false});
        this.setState({toggleAccountSuccessfullyCreatedMessage: true});
        console.log('congrats you have made an account yay');
      }
    })
    .catch(({err})=> {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="login su">
      <div className="innerContainer">
        <h1>Sign Up Here!</h1>
        <h2 className="loginUsername signupspace" >Username</h2>
        <form>
          <label style={{marginRight: '5px'}}>
            <input className="loginInput" maxLength="25" type="text" name="name" value={this.state.username} onChange={this.handleUsernameChange}/>
          </label>
        </form>
        <h2 className="loginUsername" >Password</h2>
          <form>
            <label style={{marginRight: '5px'}}>
              <input className="loginInput" maxLength="100" type="password" name="name" value={this.state.password} onChange={this.handlePasswordChange}/>
            </label>
          </form>
        <h2 className="loginUsername" >Full Name</h2>
        <form>
          <label style={{marginRight: '5px'}}>
            <input className="loginInput" maxLength="25" type="text" name="fullname" value={this.state.fullname} onChange={this.handleFullnameChange}/>
          </label>
        </form>
        <h2 className="loginUsername" >Email</h2>
        <form>
          <label style={{marginRight: '5px'}}>
            <input className="loginInput signupbottomspace" maxLength="25" type="text" name="email" value={this.state.email} onChange={this.handleEmailChange}/>
          </label>
        </form>
        <button className='signupbutton' type="button" onClick={this.handleSignup} >Sign Up</button>
        <button className='signupbutton' type="button" onClick={() => {this.props.toggleLogin()}} >Back to login</button>
        <div>
          {this.state.toggleUsernameTakenMessage ?
            <div>
              Username already exists
            </div>
              :
            <div>
            </div>
          }
        </div>
        <div>
          {this.state.toggleAccountSuccessfullyCreatedMessage ?
            <div>
              Success! Welcome to Photostory
            </div>
              :
            <div>
            </div>
          }
        </div>
      </div>  
      </div>
    );
  }
}

export default Signup;


