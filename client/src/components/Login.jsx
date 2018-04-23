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
        <div className="innerContainer">
        <div className="loginHeaderContainer">
        <img className="logo" src="http://localhost:3000/nav/post-w.png"/>
        </div>
        <h2 className="loginUsername" >Username</h2>
        <label>
          <input className="loginInput" type="text" name="name" value={this.state.username} onChange={this.handleUsernameChange}/>
        </label>
        <h2 className="loginPassword" >Password</h2>
          <label style={{marginRight: '5px'}}>
            <input className="loginInput" type="password" name="name" value={this.state.password} onChange={this.handlePasswordChange}/>
          </label>
          <button className="loginButton" type="button" onClick={this.handleLogin} style={{display: 'inline', marginTop: '10px'}}>Login</button>
          <button className="linkToSignup" type="button" onClick={() => {this.props.toggleSignup()}} style={{display: 'inline', marginTop: '10px'}}>Sign Up</button>
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
      </div>
    );
  }
}

export default Login;
