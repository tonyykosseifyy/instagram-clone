import React, { useState , useEffect } from 'react'
import './Post.css' ;
import { getFullUserById } from '../fetch' ;
import styled from 'styled-components' ;
import Avatar from '@material-ui/core/Avatar' ;
import { Link } from 'react-router-dom' ;
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder' ;
import DeleteIcon from '@material-ui/icons/Delete' ;
import FavoriteIcon from '@material-ui/icons/Favorite' ;
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import { IconButton } from "@material-ui/core";
import { FaRegComment } from 'react-icons/fa' ;
import { useSelector } from 'react-redux' ;


function Post({ post , setPostFocus , setHidden}) {
  const dark = useSelector(state => state.darkTheme ) ;
  const [ ps , setPs ] = useState(false) ;
  const [ liked , setLiked ] = useState(false) ;
  const [ notFirstMount , setNotFirstMount ] = useState(false) ;
  const handleComment = () => {
    setHidden(true) ;
    setPostFocus(post) ;
  }
  useEffect(() => {
    if (liked && !notFirstMount) {
        setNotFirstMount(true) ;
    }
  }, [ liked ])
    if ( post ) {
    return (
        <div className='post' >
            <PostOwner padding='12px 10px'>
                <Avatar src={post?.owner.picture} />
                <strong>
                    <Link to={`/user/${post.owner.id}`} style={{ color: 'inherit'}} >
                        {post?.owner.firstName}_{post?.owner.lastName}
                    </Link>
                </strong>
            </PostOwner>
            <img style={{backgroundColor: dark && '#171717'}} src={post.image} alt={`${post.owner.firstName} ${post.owner.lastName} picture`} />
            <PostInfo>
                <PostOption >
                    <PostOwner>
                        {liked ? <FavoriteIcon onClick={() => setLiked(!liked)} className='like' /> :<FavoriteBorderIcon className={notFirstMount && 'like'} style={{color:'black'}} onClick={() => setLiked(!liked)}/> }
                        <FaRegComment onClick={() => handleComment()} style={{width:'1.5em' , height:'1.5em',marginLeft:'8px'}} />
                    </PostOwner>
                      <BookmarkBorderIcon />
                </PostOption>

                <strong>{liked ? post.likes + 1 : post.likes } likes</strong>
            </PostInfo>
        </div>
    )}
} ;

export default Post ;

const PostOwner = styled.div`
    display: flex ;
    align-items: center ;
    min-height: 40px;
    padding: ${(props) => props.padding || 0 } ;
    & > strong {
        display: inline-block ;
        margin-left: 12px ;
    }
    & > strong:hover {
        text-decoration: underline ;2
    }
    & > svg {
      cursor: pointer ;
    }
`

const PostOption = styled.div`
    display: flex;
    align-items: center ;
    width: 100% ;
    justify-content: space-between ;
`

const PostInfo = styled.div`
    padding: 12px 10px ;
`
