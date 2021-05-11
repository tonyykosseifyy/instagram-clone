import React, { useState , createRef } from 'react' ;
import './Account.css' ;
import styled from 'styled-components' ;
import { useSelector } from 'react-redux' ;
import PostProfile from './PostProfile' ;
import Avatar from '@material-ui/core/Avatar' ;
import MuiButton from '@material-ui/core/Button' ;
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown' ;
import Fade from 'react-reveal/Fade'
import PhotoCamera from '@material-ui/icons/PhotoCamera';
import { Upload, message, Button } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import { IconButton } from "@material-ui/core";

const Account = ({ setHidden }) => {
  const imageUpload = createRef(null) ;
  const [ postFocus , setPostFocus ] = useState(null) ;
  const [ file , setFile ] = useState() ;
  const user = useSelector(state => state.user) ;
  const { location } = user ;
  const dark = useSelector(state => state.darkTheme) ;
  const newUser = () => {
      setPostFocus(null) ;
      setHidden(false) ;
  }
  const handleChange = (e) => {
    setFile(URL.createObjectURL(e.target.files[0]))
  }

  return (
    <div className='user-profile' style={{ background : dark ?  '#171717' : 'inherit' , color: dark ? 'white' : 'inherit'}}>

        <div className='user-profile-top'>
            <PostProfile newUser={newUser} postFocus={postFocus} setHidden={setHidden} setPostFocus={setPostFocus} comments={null} />
            <div className='user-profile-image' style={{position: 'relative'}}>
              <Avatar className='user-profile-image' src={file || user.photoURL} alt={`${user.displayName} picture`}  />
                <div className='account-input'>
                  <input type="file" onChange={(e) => handleChange(e) } ref={imageUpload} />
                    <PhotoCamera onClick={() => imageUpload.current.click()} />
              </div>
          </div>
              <div className='user-top-info'>
                    <h1 style={{color: dark ? 'white' : '#535353'}}>{user.displayName}</h1>
                    <div className='account-buttons' >
                        <MuiButton >
                            <ArrowDropDownIcon />
                        </MuiButton>
                    </div>
              </div>
              <div className='user-description'>
                    <ul>
                        {user.gender && <li key={user?.gender}><strong>gender </strong> {user.gender}</li>}
                        {user.phone && <li key={user?.phone}><strong>phone number </strong>{user.phone}</li>}
                        {user.email && <li key={user?.email}><strong>email </strong>{user.email}</li>}
                        {(location?.country || location?.state || location?.city ) && <li key={user?.location.country}><strong>location </strong>{user.location.country} {user.location.city} {user.location.state}</li>}
                    </ul>
              </div>

        </div>
        <div className='user-profile-bar'></div>
    </div>
  )
} ;


export default Account ;
