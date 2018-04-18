import React from 'react';
import axios from 'axios';
import Thumbnail from './Thumbnail.jsx';
import Post from './Post.jsx';

class Search extends React.Component {
  constructor(props) {
    super(props);
    
    this.state = {
      search: '',
      searchData: this.props.posts,
      post: false
    }
  }

  componentWillUnmount() {
    this.setState({post: false});
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

  onPostThumbClickHandler(e) {
    this.setState({post: e})
    console.log(e);
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
        !this.state.post ?  
          this.state.searchData.map(post => 
            <Thumbnail post={post} onClick={this.onPostThumbClickHandler.bind(this)} postState={this.state.post}/>
          )
        :
          <Post post={this.state.post} liked={this.props.liked}/>  
        }
      </div>
    );
  }
}

export default Search;


