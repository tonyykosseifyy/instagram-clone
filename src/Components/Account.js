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
import { Input } from 'antd';

const Account = ({ setHidden }) => {
  const imageUpload = createRef(null) ;
  const [ postFocus , setPostFocus ] = useState(null) ;
  const [ file , setFile ] = useState() ;
  const user = useSelector(state => state.user) ;
  const { location } = user ;
  const dark = useSelector(state => state.darkTheme) ;
  const [userDesc , setUserDesc ] = useState({
    gender : '' ,
    phoneNumber: '',
    email: user.email ,
    location: ''
  })
  const inputChange = (e) => {
    const { name , value } = e.target ;
    setUserDesc({
      ...userDesc ,
      [name] : value
    })
    console.log(userDesc , name , value)
  }
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
              <div className='user-description account-description'>
                    <ul>
                        <li><strong>gender </strong> </li>
                        <li><strong>phone number </strong> <Input value={userDesc.phoneNumber} onChange={(e) => inputChange(e)} name='phoneNumber' /> </li>
                        <li><strong>email </strong> <Input type='email' value={userDesc.email} onChange={(e) => inputChange(e)} name='email' /> </li>
                        <li><strong>location </strong> <Input value={userDesc.location} onChange={(e) => inputChange(e)} name='location' />  </li>
                    </ul>
                    <MuiButton>Save changes </MuiButton>
              </div>

        </div>
        <div className='user-profile-bar'></div>
    </div>
  )
} ;


export default Account ;
