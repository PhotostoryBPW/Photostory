import React from 'react';
const axios = require('axios');

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: ''
    }
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleSignup = this.handleSignup.bind(this);
  }

  handleUsernameChange(e) {
    this.setState({username: e.target.value});
    console.log(this.state.username);
  }

  handlePasswordChange(e) {
    this.setState({password: e.target.value});
    console.log(this.state.password);
  }

  handleSignup() {
    var payload = 
    {username: this.state.username, 
     password: this.state.password,
    }
    console.log(payload);
    axios.post('http://localhost:3000/api/signup/', payload)
    .then((response) => {
      if (response !== 'username already exists') {
        // this.props.isLoggedInHandler();
        console.log(response);
      } else {
        console.log('congrats you have made an account yay');
      }
    })
    .catch(({err})=> {
      console.log(err);
    })
  }

  render() {
    return (
      <div>
        <h1>Sign Up Here!</h1>
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
            <button type="button" onClick={this.handleSignup} style={{display: 'block', marginTop: '10px', marginLeft: '50px'}}>Sign Up</button>
            <button type="button" onClick={() => {this.props.toggleLogin()}} style={{display: 'block', marginTop: '10px', marginLeft: '50px'}}>Back to login</button>
          </form>
      </div>
    );
  }
}

export default Signup;


