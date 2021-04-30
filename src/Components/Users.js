import React, { useState , useEffect } from 'react' ;
import './Users.css'
import Avatar from '@material-ui/core/Avatar' ;
import Button from '@material-ui/core/Button' ;
import {  getUsersPostsById } from '../fetch' ;
import { useSelector } from 'react-redux' ;
import { Link } from 'react-router-dom' ;


const Users = ({ user }) => {
    const dark = useSelector(state => state.darkTheme ) ;
    if (user) {
        return (
            <div className='user'>
                <div className='user-left'>
                    <Avatar src={ user.picture } alt={`${user.firstName} ${user.lastName}`} />
                    <div className='user-top'>   
                        <strong>
                            <Link style={{color: 'inherit'}} to={`/user/${user.id}`} >
                                {user.firstName} {user.lastName}
                            </Link>
                        </strong>
                        
                        <a href={`mailto:${user.email}`} >{user.email}</a>
                    </div>
                </div>
                <div className='user-right'>
                    <Button>Follow</Button>
                </div>
                
            </div>
        )
}} ;

export default Users ;

/*<strong>location: <span>{fullUser?.location.country}</span> <span>{fullUser?.location.city}</span> <span>{fullUser?.location.state}</span> <span>{fullUser?.location.street}</span></strong>*/