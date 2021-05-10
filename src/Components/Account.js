import React, { useState } from 'react' ;
import './Account.css' ;
import styled from 'styled-components' ;
import { useSelector } from 'react-redux' ;
import PostProfile from './PostProfile' ;
import Avatar from '@material-ui/core/Avatar' ;
import Button from '@material-ui/core/Button' ;
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown' ;


const Account = ({ setHidden }) => {
  const [ postFocus , setPostFocus ] = useState(null) ;
  const user = useSelector(state => state.user) ;
  const dark = useSelector(state => state.darkTheme) ;
  const newUser = () => {
      setPostFocus(null) ;
      setHidden(false) ;
  }
  return (
    <div className='user-profile' style={{ background : dark ?  '#171717' : 'inherit' , color: dark ? 'white' : 'inherit'}}>

        <div className='user-profile-top'>
            <PostProfile newUser={newUser} postFocus={postFocus} setHidden={setHidden} setPostFocus={setPostFocus} comments={null} />
            <Avatar className='user-profile-image' src={user.photoURL} alt={`${user.displayName} picture`}  />
              <div className='user-top-info'>
                    <h1 style={{color: dark ? 'white' : '#535353'}}>{user.displayName}</h1>
                    <div>
                        <Button >
                            <ArrowDropDownIcon />
                        </Button>
                    </div>
              </div>
              {user.gender && <div className='user-description'>
                    <ul>
                        <li key={user.gender}><strong>gender </strong> {user.gender}</li>
                        <li key={user.phone}><strong>phone number </strong>{user.phone}</li>
                        <li key={user.email}><strong>email </strong>{user.email}</li>
                        <li key={user.location.country}><strong>location </strong>{user.location.country} {user.location.city} {user.location.state}</li>
                    </ul>
              </div>}

        </div>
        <div className='user-profile-bar'></div>
    </div>
  )
} ;


export default Account ;
