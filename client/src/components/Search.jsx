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

  componentDidMount() {
    let posts = [];
    let comments = [];
    axios.get('api/search')
      .then( response => {
        posts = [];
        comments = [];
        if (response.data.length) {
          response.data.forEach(data => {
            if (data.parent_id) {
              comments.push(data)
            } else {
              posts.push(data);
            }
          })
        }
      })
      .then(() => {
        posts.map(post => {
          comments.forEach(comment => {
            if (comment.parent_id === post.id) {
              if (!post.children) {
                post.children = [comment];
              } else {
                post.children.push(comment);
              }
            }
          })
        })
      })
      .then(() => {
        this.setState({
          searchData: posts,
        })
      })
      .catch( err => {
        console.log(err);
      })
  }
  
  onClickHandler() {
    console.log('we are searching for username: ')
    this.setState({post: false})
    axios.get(`/api/search/${this.state.search}`, {
      params: {
        search: this.state.search
      }
    })
    .then( response => {
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
  }
  
  onChangeHandler(e) {
    this.setState({search: e.target.value})  
  }

  render() {
    return (
      <div>
        <div><br />&nbsp;&nbsp; Find a user...</div>
        <input id="searchText" onBlur={this.onChangeHandler.bind(this)}/><button className="buttonLight" onClick={this.onClickHandler.bind(this)}>SEARCH</button>
        {
          this.state.searchData.length !== 0
          ?
        <div>
        {
        !this.state.post
        ?
        <div className='searchThumbContainer'>
        {  
        this.state.searchData.map(post => 
          !post.parent_id  
          ?
          <Thumbnail key={Math.floor((Math.random() * 100000) + 1)} post={post} onClick={this.onPostThumbClickHandler.bind(this)} postState={this.state.post}/>
          :
          <div/>
        )
        }
        </div>
        :
        <Post key={Math.floor((Math.random() * 1000000) + 1)} post={this.state.post} liked={this.props.liked} handleClick={this.props.handleClick} currentUserProfilePhoto={this.props.userInfo.userPhotoUrl}/>  
        }
        </div>
        :
        <div id="nosearchresult">
          Sorry, we couldn't find that user.
        </div>
        }
      </div>
    );
  }
}

export default Search;



