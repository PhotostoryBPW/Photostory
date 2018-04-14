import React from 'react';
import axios from 'axios';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      search: '',
      searchData: this.props.posts
    }
  }

  
  componentDidMount(){
    axios.get('/api/search')
    .then( response => {
      console.log('response', response)
      this.setState({ 
        searchData: response.data
      })
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  onClickHandler() {
    console.log('we are searching for username: ')
    axios.get(`http://localhost:3000/api/search/${this.state.search}`, {
      params: {
        search: this.state.search
      }
    })
    .then( response => {
      console.log('response', response)
      this.setState({ 
        searchData: response.data
      })
    })
    .catch( err => {
      console.log(err);
    })
  }
  
  onChangeHandler(e) {
    this.setState({search: e.target.value})  
    console.log(this.state.search);
  }

  render() {
    return (
      <div>
        <input onChange={this.onChangeHandler.bind(this)}/><button onClick={this.onClickHandler.bind(this)}>Search</button>
        {
          this.state.searchData.map(post => 
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


