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
    console.log(this.state.username);
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
    console.log(this.state.password);
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
      if (response.data === 'active') {
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
      <div>
        <h1>Photostory</h1>
        <h2>Username</h2>
        <label style={{marginRight: '5px'}}>
          <input type="text" name="name" value={this.state.username} onChange={this.handleUsernameChange}/>
        </label>
        <h2>Password</h2>
          <label style={{marginRight: '5px'}}>
            <input type="password" name="name" value={this.state.password} onChange={this.handlePasswordChange}/>
          </label>
          <button type="button" onClick={this.handleLogin} style={{display: 'block', marginTop: '10px', marginLeft: '50px'}}>Login</button>
          <button type="button" onClick={() => {this.props.toggleSignup()}} style={{display: 'block', marginTop: '10px', marginLeft: '50px'}}>Sign up</button>
          <div>
            {this.state.toggleIncorrectCredentialsMessage ?
              <div>
                Incorrect Username and/or password
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
