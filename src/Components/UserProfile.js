import React, { useState , useEffect } from 'react' ;
import './UserProfile.css' ;
import { useParams } from 'react-router-dom' ;
import { getFullUserById , getUsersPostsById , BASE_URL , APP_ID } from '../fetch' ;
import Avatar from '@material-ui/core/Avatar' ;
import Button from '@material-ui/core/Button' ;
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown' ;
import { useSelector } from 'react-redux' ;
import FavoriteIcon from '@material-ui/icons/Favorite'
import axios from 'axios' ;
import { FaComment } from 'react-icons/fa' ;
import PostProfile from './PostProfile' ;
import UserProfileSkeleton from './UserProfileSkeleton' ;
import PostSkeleton from './PostUserSkeleton' ;
import { notification } from 'antd' ;
import 'antd/dist/antd.css' ;
import styled from 'styled-components' ;

const postContainerFunction = (length) => {
    if( (length / 3) > Math.floor(length / 3)) {
        return Math.floor(length / 3) + 1 ;
    } else {
        return Math.floor(length / 3)
    }
}

const UserProfile = () => {
    const dark = useSelector(state => state.darkTheme) ;
    let { userId } = useParams() ;
    const [ user , setUser ] = useState() ;
    const [ error , setError ] = useState(false) ;
    const [ posts , setPosts ] = useState([]) ;
    const [ postsError , setPostsError ] = useState(false) ;
    const [ postsComments , setPostsComments ] = useState([]) ;
    const [ postFocus , setPostFocus ] = useState() ;
    const [ chosenIndex , setChosenIndex ] = useState() ;
    const [ loading , setLoading ] = useState(true) ;
    const [ loadingPosts , setLoadingPosts ] = useState(true) ;
    const [ postContainer , setPostContainer ] = useState([]) ;
    useEffect(() => {
        const args = {
            message: 'New notification' ,
            description: 'Feel free to click on a post to add a comment' ,
            duration: 4.5
        }
        notification.open(args)
    }, [])
    useEffect(() => {
        getFullUserById( setUser , setError , userId , setLoading) ;
        getUsersPostsById( setPosts , setPostsError , userId , setLoadingPosts)
    },[userId])
    const onPostClick = (item , index) => {
        setPostFocus(item) ;
        setChosenIndex(index)
    }
    const newUser = () => {
        setChosenIndex(null)
        setPostsComments([])
        setPosts([])
        setPostFocus(null)
    }
    console.log(postsComments , 'post comment in state')
    useEffect(() => {
        if(posts.length > 0 && postsComments.length === 0) {
            posts.forEach((item , index) => {
                axios.get(`${BASE_URL}/post/${item.id}/comment?limit=30`, { headers: { 'app-id': APP_ID } })
                .then(({ data }) => {
                    console.log(data.data, 'data.data')
                    setPostsComments((prev) => {
                        return [
                            ...prev ,
                            data.data
                        ]
                    })
                })
                .catch(error => {
                    setPostsComments([
                        ...postsComments ,
                        []
                    ])
                })
            })
    }
    }, [posts] )

    useEffect(() => {
      if (posts.length > 0 ) {
        const num = postContainerFunction(posts.length) ;
        let first = 0 ;
        let postscontainer = [] ;
        for (let i = 0 ; i < num ; i++ ) {
          postscontainer.push(posts.slice(first , first + 3 )) ;
          first+= 3 ;
          console.log('post container ==> ' , postscontainer)
        }
        console.log(num , first , postContainer)
        setPostContainer(postscontainer)
      }
    },[ posts ])
    console.log(postContainer
       , 'testedd')
    if ( !error ) {
        return (
            <div className='user-profile' style={{ background : dark ?  '#171717' : 'inherit' , color: dark ? 'white' : 'inherit'}}>
                { user && !loading ?

                <div className='user-profile-top'>
                    <PostProfile newUser={newUser} postFocus={postFocus} setPostFocus={setPostFocus} comments={postsComments[chosenIndex]} />
                    <Avatar className='user-profile-image' src={user.picture} alt={`${user.firstName} ${user.lastName} picture`}  />
                    <div className='user-profile-top-right'>
                        <div className='user-top-info'>
                            <h1 style={{color: dark ? 'white' : '#535353'}}>{`${user.firstName}_${user.lastName}`} </h1>
                            <div >
                                <Button color='primary' >Follow</Button>
                                <Button >
                                    <ArrowDropDownIcon />
                                </Button>
                            </div>
                        </div>
                        <div className='user-description'>
                            <ul>
                                <li key={user.gender}><strong>gender </strong> {user.gender}</li>
                                <li key={user.phone}><strong>phone number </strong>{user.phone}</li>
                                <li key={user.email}><strong>email </strong>{user.email}</li>
                                <li key={user.location.country}><strong>location </strong>{user.location.country} {user.location.city} {user.location.state}</li>
                            </ul>
                        </div>
                    </div>

                </div>

                :
                <UserProfileSkeleton />
                 }
                { (!postsError && posts.length > 0 && !loadingPosts ) ? (

                    <div className='user-profile-posts-section'>
                        <div className='user-profile-bar'></div>
                        <PostContainerGrid postsLength={posts.length} >
                            {posts.map((item , index) => (
                                <div className='post-container' onClick={() => onPostClick(item , index)}>
                                    <img src={item.image} key={index} alt={item.text} />
                                    <div className='post-overlay'>
                                        <div style={{color: 'white'}}>
                                            <FavoriteIcon />
                                            <strong style={{marginLeft: '6px' , marginRight: '15px'}}>{item.likes}</strong>
                                            {postsComments.length == posts.length &&
                                            <>
                                            <FaComment />
                                            <strong  style={{marginLeft: '6px'}}>
                                                { postsComments[index].length }
                                            </strong>
                                            </>
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </PostContainerGrid>
                    </div>
                ) : <PostSkeleton /> }
            </div>
        )}

    else {
        return (
            <div className='user-error'>
                Error displaying user information to fix this issue try reloading the page .
            </div>
        ) ;
}};

export default UserProfile ;



const PostContainerGrid = styled.div`
  display: grid ;
  grid-template-columns: repeat(3 , 1fr) ;
  grid-template-rows: ${(props) => `repeat(${postContainerFunction(props.postsLength)} , 220px)`};
  grid-column-gap: 20px ;
  grid-row-gap: 20px ;
  max-width: 950px ;
  @media (max-width: 1124px) {
    grid-template-rows: ${(props) => `repeat(${postContainerFunction(props.postsLength)} , 190px)`};
    grid-column-gap: 15px ;
    grid-row-gap: 15px ;
  }
  @media (max-width: 800px) {
    grid-template-rows: ${(props) => `repeat(${postContainerFunction(props.postsLength)} , 150px)`};
    grid-column-gap: 6px ;
    grid-row-gap: 6px ;
    padding-bottom: 70px ;
  }
  @media (max-width: 500px ) {
    grid-template-rows: ${(props) => `repeat(${postContainerFunction(props.postsLength)} , 100px)`};
    grid-column-gap: 3px ;
    grid-row-gap: 3px ;
  }
`
