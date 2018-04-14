import React from 'react';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      search: '',
    }
  }

  onClickHandler() {
    
  }

  onChangeHandler(e) {
    console.log(e.target.value);
    this.setState({search: e.target.value})  
  }

  render() {
    console.log('got here to posts')
    return (
      <div>
        <input onChange={this.onChangeHandler.bind(this)}/><button onClick={this.onClickHandler}>Search</button>
        {
          this.props.posts.map(post => 
            <div className='searchThumb'>
            <img src={`http://${post.photoUrl}`}/>
            </div>
          )
        }
      </div>
    );
  }
}

export default Search;


