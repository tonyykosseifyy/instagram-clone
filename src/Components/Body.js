import React, { useState , useEffect } from 'react'
import './Body.css' ;
import Sidebar from './Sidebar' ;
import { useSelector } from 'react-redux' ;
import { getRandomPosts } from '../fetch.js' ;
import Post from './Post'
import PostSkeleton from './PostSkeleton'
import Fade from 'react-reveal/Fade' ;
import PostProfile from './PostProfile' ;


function Body({setHidden}) {
    const dark = useSelector(state => state.darkTheme) ;
    const [ posts , setPosts ] = useState([]) ;
    const [ error , setError ] = useState(false) ;
    const [ loading , setLoading ] = useState(true) ;
    const [ postFocus , setPostFocus ] = useState(null) ;
    let array = [ 1 , 2 , 3 , 4, 5 ] ;
    useEffect(() => {
        getRandomPosts( setPosts ,setError ,  setLoading)
    }, [])
    console.log(posts , 'postsss') ;
    const newUser = () => {
        setPostFocus(null) ;
        setHidden(false) ;
    }

    return (
        <div className='body' style={{background : dark ? '#171717' : '#fafafa' , color: dark ? 'white' : 'black'}}>
            <PostProfile postFocus={postFocus} setPostFocus={setPostFocus} setHidden={setHidden} home newUser={newUser} />
            <main className='main-body'>
               { !error ?
                   (!loading ) ?
                    posts.map((item , index) => (
                        <Post key={index} post={item} setPostFocus={setPostFocus} setHidden={setHidden} />
                    ))
                   :
                    array.map((item , index) => (
                        <PostSkeleton key={index} />
                    ))
                :
                <Fade>
                    Error loading posts , to fix this issue reload the page .
                </Fade>
                }
            </main>

            <Sidebar />
        </div>
    )
} ;

export default Body ;
