import React, { useState , useEffect } from 'react'
import './PostProfile.css' ;
import CloseIcon from '@material-ui/icons/Close' ;
import Avatar from '@material-ui/core/Avatar' ;
import { useSelector } from 'react-redux' ;
import { Link } from 'react-router-dom' ;
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder' ;
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder' ;
import DeleteIcon from '@material-ui/icons/Delete' ;
import FavoriteIcon from '@material-ui/icons/Favorite' ;
import { IconButton } from "@material-ui/core";
import { FaRegComment } from 'react-icons/fa' ;
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon' ;
import { getPostComments } from '../fetch'
import CircularProgress from '@material-ui/core/CircularProgress'
import Picker from 'emoji-picker-react';

function PostProfile({ postFocus , setPostFocus , comments , newUser , home , setHidden }) {
  const [chosenEmoji, setChosenEmoji] = useState(null);
    const [ comment , setComment ] = useState('') ;
    const [ postComments , setPostComments ] = useState([]) ;
    const [ reload , setReload ] = useState(false) ;
    const [ error , setError ] = useState(false)
    const [ loading , setLoading ] = useState(false) ;
    const [ animation , setAnimation ] = useState(false) ;
    const [ liked , setLiked ] = useState(false) ;
    const [ notFirstMount , setNotFirstMount ] = useState(false) ;
    const [ openEmogi  , setOpenEmogi ] = useState(false) ;
    const onEmojiClick = (event, emojiObject) => {
        setChosenEmoji(emojiObject);
    };
    useEffect(() => {
        if ( !home ) {
            setPostComments(comments)
        }
    }, [ comments ])
    useEffect(() => {
        if ( home && postFocus ) {
            console.log('fetching')
            getPostComments(setPostComments , setError ,postFocus.id , setLoading  )
        }
    }, [postFocus])
    const dark = useSelector(state => state.darkTheme)
    const textInput = React.createRef() ;
    const deleteComment = ( index ) => {
        let array = postComments ;
        setPostComments([])
        setReload(!reload)
        array.splice(index , 1 ) ;
        setPostComments(array)
    }
    const postComment = () => {
        if (comment.trim()) {
            let date = new Date() ;
            setPostComments((prev) => [
                ...prev ,
                {
                    owner : {
                        firstName: 'Anonymous' ,
                        lastName: ''
                    } ,
                    message: comment ,
                    publishDate : `${date.getFullYear()}-${date.getMonth().toString().length === 1 ? `0${date.getMonth()}` : date.getMonth()}-${date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours() }` ,
                }
            ])
            setComment('')
        }
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        postComment()
    }
    useEffect(() => {
      if (postFocus) {
        setAnimation(true)
      }
      else {
        setAnimation(false)
      }
    }, [postFocus])
    const onClose = () => {
      setHidden(false) ;
      setPostFocus(null);
    }
    useEffect(() => {
      if (liked && !notFirstMount) {
          setNotFirstMount(true) ;
      }
    }, [ liked ])
    console.log('comments in post profile' , comments) ;
    console.log('comments in state post profile' , postComments )
    if ( postFocus ) {
        return (
        <div className={`post-profile ${animation && 'animation-profile'}`} >
            <CloseIcon onClick={() => onClose()} />
            <div className='post-profile-post'>
              { home && loading &&  <CircularProgress className='circular-loading'  /> }
                <img src={postFocus.image} alt={`${postFocus.text} image`} />
                <div className='post-profile-post-comment-section' style={{backgroundColor: dark ? '#171717' : 'white' ,color: dark ? 'white' : 'black'}}>
                    <div className='post-profile-user' >
                        <Avatar src={postFocus.owner.picture} alt={`${postFocus.owner.firstName} ${postFocus.owner.lastName} image`} />
                        <strong>{`${postFocus.owner.firstName}_${postFocus.owner.lastName}`}</strong>
                    </div>
                    <div className='post-profile-bar'></div>
                    <div className='post-profile-comments'>
                        <div className='post-profile-comment' >
                            <Avatar src={postFocus.owner.picture} alt={`${postFocus.owner.firstName} ${postFocus.owner.lastName} image`} />
                            <div className='post-profile-comment-text'>
                                <p style={{color: dark ? 'white' : 'black'}}><strong>{`${postFocus.owner.firstName}_${postFocus.owner.lastName}`}</strong>{postFocus.text.length > 100 ? `${postFocus.text.slice(0 , 100)}...` : postFocus.text }</p>
                                <span>{postFocus.publishDate.slice(0 , 10 )}</span>
                            </div>
                        </div>
                        { postComments?.length > 0 ? postComments.map((item , index) => (
                            <div key={index} className='post-profile-comment'>
                                <Avatar src={item.owner.picture} />
                                <div className='post-profile-comment-text'>
                                    <p style={{color: dark ? 'white' : 'black'}}><Link className='post-profile-link' to={`/user/${item.owner.id}`}><strong onClick={() => newUser()} style={{textDecoration: 'none'}}>{`${item.owner.firstName}_${item.owner.lastName}`}</strong></Link> {item.message}</p>
                                    { !item.id ? <div style={{ alignItems: 'center' , display: 'flex'}}>
                                        <span>{item.publishDate}</span>
                                        <span onClick={() => deleteComment(index)} style={{display:'flex' , alignItems: 'center' , marginLeft: '10px' , cursor: 'pointer'}}><DeleteIcon style={{width: '18px' , height:'18px'}} /> delete</span>
                                    </div> :
                                        <span>{item?.publishDate.slice(0 , 10)}</span>
                                    }
                                </div>
                            </div>
                        )) :
                        <p>No Comments Yet ! </p>}
                    </div>
                    <div className='post-profile-bar' style={{margin: '10px -10px '}}></div>
                    <div className='post-profile-options'>
                        <div style={{ color: dark ? 'white' : 'black'}}>
                            {liked ? <FavoriteIcon onClick={() => setLiked(!liked)} className='like' /> :<FavoriteBorderIcon className={notFirstMount && 'like'}
                             style={{color: 'inherit'}} onClick={() => setLiked(!liked)}/> }
                            <FaRegComment onClick={() => textInput.current.focus()} style={{width:'1.5em' , height:'1.5em',marginLeft:'8px'}}  />
                        </div>
                        <BookmarkBorderIcon />
                    </div>
                    <div className='post-profile-bar' style={{margin: '10px -10px ' ,marginBottom: '0'}}></div>

                    <form className='form-input' onSubmit={(e) => handleSubmit(e)}>
                      <IconButton style={{margin :'0 10px'}} onClick={() => setOpenEmogi(!openEmogi)} >
                        <InsertEmoticonIcon style={{height: '30px' , width: '30px'}} />
                      </IconButton>
                      <Picker onEmojiClick={onEmojiClick} pickerStyle={{transform: openEmogi && 'scale(1)' }} />
                        <input ref={textInput} style={{background: dark ? 'transparent' : 'inherit',color: dark ? 'white' : 'black'}} type='text' placeholder='Add a comment...' value={comment} onChange={(e) => setComment(e.target.value)} />
                        <button style={{opacity: comment.trim() ? '1' : '.35', cursor: !comment.trim() ? 'not-allowed':'' }}  >Post</button>
                    </form>

                </div>

            </div>
        </div>
    )} else {
        return null
    }

} ;

export default PostProfile ;
{/*
const postComment = () => {
        if (comment.trim()) {
            let date = new Date() ;
            setPostComments((prev) => [
                ...prev ,
                {
                    owner : {
                        firstName: 'Anonymous' ,
                        lastName: ''
                    } ,
                    message: comment ,
                    publishDate : `${date.getFullYear()}-${date.getMonth().toString().length === 1 ? `0${date.getMonth()}` : date.getMonth()}-${date.getHours().toString().length === 1 ? `0${date.getHours()}` : date.getHours() }` ,
                }
            ])
            setComment('')
        }
    }


*/}
