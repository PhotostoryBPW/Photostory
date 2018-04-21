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
        console.log('got search with the current data: ', response.data)
        response.data.forEach(data => {
          if (data.parent_id) {
            comments.push(data)
          } else {
            posts.push(data);
          }
        })
      })
      .then(() => {
        posts.map(post => {
          comments.forEach(comment => {
            console.log(comment.parent_id === post.id);
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
        console.log('this is search posts after it is done compiling children', posts);
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
    axios.get(`/api/search/${this.state.search}`, {
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
  }
  
  onChangeHandler(e) {
    this.setState({search: e.target.value})  
  }

  render() {
    return (
      <div>
        <input onChange={this.onChangeHandler.bind(this)}/><button onClick={this.onClickHandler.bind(this)}>Search</button>
        {
        !this.state.post 
        ?  
        this.state.searchData.map(post => 
          !post.parent_id  
          ?
          <Thumbnail post={post} onClick={this.onPostThumbClickHandler.bind(this)} postState={this.state.post} handleClick={this.props.handleClick}/>
          :
          <div/>
        )
        :
<<<<<<< HEAD
        <Post post={this.state.post} handleClick={this.props.handleClick}/>  
=======
        <Post post={this.state.post} liked={this.props.liked} handleClick={this.props.handleClick} currentUserProfilePhoto={this.props.userInfo.userPhotoUrl}/>  
>>>>>>> 32d8a15b9bbd026c72ef2d15dfeb87011ac8b5dc
        }
      </div>
    );
  }
}

export default Search;


