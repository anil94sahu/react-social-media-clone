import React, { useEffect } from 'react'
import './Posts.css'
// import {PostsData} from '../Data/PostsData';
import Post from '../Post/Post';
import { useDispatch, useSelector } from 'react-redux';
import { getTimelinePosts } from '../../actions/postAction';
const Posts = () => {
  const dispatch = useDispatch();
  const {user} = useSelector(state=>state.authReducer.authData);
  const {posts,loading}=useSelector(state=>state.postReducer);
  useEffect(()=>{
    dispatch(getTimelinePosts(user._id));
  },[]);
  return (
    <div className="Posts">
        {loading?'Fetching posts...':
            posts?posts.map((post,i) => {
                return <Post data={post} key={i}/>
            }):null
        }
    </div>
  )
}

export default Posts