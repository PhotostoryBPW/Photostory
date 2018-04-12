import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h1 style={{textAlign: 'center'}} >Photostory</h1>
        <h2 style={{textAlign: 'center'}}>Username</h2>
      </div>
    );
  }
}

export default Login;