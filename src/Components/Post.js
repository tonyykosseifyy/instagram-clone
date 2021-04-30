import React, { useState , useEffect } from 'react'
import './Post.css' ;
import { getFullUserById } from '../fetch' ;
import styled from 'styled-components' ;
import Avatar from '@material-ui/core/Avatar' ;
import { Link } from 'react-router-dom' ;
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder' ;
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder' ;
import DeleteIcon from '@material-ui/icons/Delete' ;
import FavoriteIcon from '@material-ui/icons/Favorite' ;
import { IconButton } from "@material-ui/core";
import { FaRegComment } from 'react-icons/fa' ;

function Post({ post , setPostFocus }) {
    if ( post ) {
    return (
        <div className='post' >
            <PostOwner>
                <Avatar src={post?.owner.picture} />
                <strong>
                    <Link to={`/user/${post.owner.id}`} style={{ color: 'inherit'}} >
                        {post?.owner.firstName}_{post?.owner.lastName}
                    </Link>
                </strong>
            </PostOwner>
            <img src={post.image} alt={`${post.owner.firstName} ${post.owner.lastName} picture`} />
            <PostInfo>
                <PostOption >
                    <PostOwner>
                        <IconButton>
                            <FavoriteIcon />
                        </IconButton>

                        <IconButton onClick={() => setPostFocus(post)} >
                            <FaRegComment />
                        </IconButton>
                    </PostOwner>

                    <IconButton>
                        <BookmarkBorderIcon />
                    </IconButton>
                </PostOption>

                <strong>{post.likes} likes</strong>
            </PostInfo>
        </div>
    )}
} ;

export default Post ;

const PostOwner = styled.div`
    display: flex ;
    align-items: center ;
    min-height: 40px; 
    padding: 12px 10px ;
    & > strong {
        display: inline-block ;
        margin-left: 12px ;
    }
    & > strong:hover {
        text-decoration: underline ;
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