import React from 'react';
const axios = require('axios');

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
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
    axios.get('http://localhost:3000/api/login/', {params: {
      username: payload.username,
      password: payload.password
    }})
    .then((response) => {
      if (response.data === 'Welcome') {
        this.props.toggleLoggedIn();
      } else {
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
        <form>
          <label style={{marginRight: '5px'}}>
            <input type="text" name="name" value={this.state.username} onChange={this.handleUsernameChange}/>
          </label>
        </form>
        <h2>Password</h2>
          <form>
            <label style={{marginRight: '5px'}}>
              <input type="password" name="name" value={this.state.password} onChange={this.handlePasswordChange}/>
            </label>
            <button type="button" onClick={this.handleLogin} style={{display: 'block', marginTop: '10px', marginLeft: '50px'}}>Login</button>
            <button type="button" onClick={() => {this.props.toggleSignup()}} style={{display: 'block', marginTop: '10px', marginLeft: '50px'}}>Sign up</button>
          </form>
      </div>
    );
  }
}

export default Login;
