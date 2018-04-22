import React from 'react';
const axios = require('axios');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      toggleIncorrectCredentialsMessage: false,
      toggleSuccessMessage: false,
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
  }

  handleLogin() {
    var payload = 
    {username: this.state.username, 
     password: this.state.password,
    }
    axios.post('http://localhost:3000/api/login/', {
      username: payload.username,
      password: payload.password
    })
    .then((response) => {
      console.log('this is the data on a response for handleLogin: ', response.data.status)
      if (response.data.status === 'active') {
        this.setState({toggleSuccessMessage: true});
        this.setState({toggleIncorrectCredentialsMessage: false});
        this.props.toggleLoggedIn();
        this.props.setCurrent(this.state.username);
        console.log('this is the username on the login component', this.state.username);
      } else {
        this.setState({toggleIncorrectCredentialsMessage: true});
        this.setState({toggleSuccessMessage: false});
        console.log('incorrect login');
      }
    })
    .catch(({err})=> {
      console.log(err);
    })
  }

  render() {
    return (
      <div className="login">
        <img src="http://localhost:3000/logo.png" alt="Photostory" width="250px" id="splash"/>
        <div className="credentials">
        <h2>Username</h2>
          <input type="text" name="name" value={this.state.username} onChange={this.handleUsernameChange}/>
        <h2>Password</h2>
          <input type="password" name="name" value={this.state.password} onChange={this.handlePasswordChange}/>
        </div>
        <div className="loginBtns">
          <button type="button" class="buttonLight" onClick={this.handleLogin}>Login</button>
          <button type="button" class="buttonLight" onClick={() => {this.props.toggleSignup()}}>Sign up</button>
        </div> 
          <div>
            {this.state.toggleIncorrectCredentialsMessage ?
              <div>
                Incorrect username and/or password.
              </div>
                :
              <div>
              </div>
            }
          </div>
          <div>
            {this.state.toggleSuccessMessage ?
              <div>
                Logging in...
              </div>
                :
              <div>
              </div>
            }
          </div> 
      </div>
    );
  }
}

export default Login;
