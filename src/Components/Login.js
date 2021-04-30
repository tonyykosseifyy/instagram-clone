import React, { useState , useEffect } from 'react'
import './Login.css' ;
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth' ;
import firebase from 'firebase' ;
import { login } from '../actions' ;
import { useDispatch , useSelector } from 'react-redux' ;
import { Redirect } from 'react-router-dom' ;

const config = {
    apiKey: "AIzaSyAUpRGuC0pJeRpElJAu9BHQfUEQulvt-Kw",
    authDomain: "instagram-clone-43e4c.firebaseapp.com",
    projectId: "instagram-clone-43e4c",
    storageBucket: "instagram-clone-43e4c.appspot.com",
    messagingSenderId: "327532139556",
    appId: "1:327532139556:web:5feb31ef4d3a2c9dc234b1",
    measurementId: "G-96Y39P5W6D"
};
firebase.initializeApp(config) ;


function Login() {
    const baseURL = 'https://www.instagram.com/static/images/homepage/' ;
    const imageArray = [
        'screenshot1.jpg/d6bf0c928b5a.jpg' ,
        'screenshot2.jpg/6f03eb85463c.jpg' ,
        'screenshot3.jpg/f0c687aa6ec2.jpg' ,
        'screenshot4.jpg/842fe5699220.jpg' ,
        'screenshot5.jpg/0a2d3016f375.jpg'
    ]
    const [ imageIndex , setImageIndex ] = useState(0) ;
    const dispatch = useDispatch() ;
    const userDisplayName = useSelector(state => state.user.displayName)
    useEffect(() => {
        let timer = setTimeout(() => {
            setImageIndex((prev) => {
                if ( prev === ( imageArray.length -  1 ) ) {
                    return 0 ;
                } else {
                    return prev + 1 ;
                }
            })
        }, 4000)
        return () => {
            clearTimeout(timer)
        }
    }, [ imageIndex ]) 
    const uiConfig = {
        signInFlow: 'popup' , 
        signInOptions: [
            firebase.auth.GoogleAuthProvider.PROVIDER_ID ,
            firebase.auth.FacebookAuthProvider.PROVIDER_ID
        ] ,
        callbacks : {
            signInSuccessWithAuthResult : () => false
        }
    }
    const signAnonymous = () => {
        dispatch(login({
            displayName: 'Anonymous' ,
            email: null ,
            photoURL: null ,
        }))
    }
    useEffect(() => {
        firebase.auth().onAuthStateChanged((user) => {
            if ( user ) {
                dispatch(login({
                    displayName: user.displayName ,
                    email: user.email ,
                    photoURL: user.photoURL ,
                }))
        }})
    })
    console.log(userDisplayName ,'user nammeeeeeeee')
    if ( !userDisplayName ) {
    return (
        <div className='login'>
            <div className='login-left'>
                <div className='login-images'>
                    { imageArray.map((item , index) => (
                        <img src={`${baseURL}${item}`} alt={index} style={{opacity: index === imageIndex ? '1' : '0'}} key={index} />
                    ))}
                </div>
            </div>

            <div className='login-right' >
                <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXm8H7K0a-4nYAwKUu57KI463WaS6BGR7NlFQT5jx05FUdK36UdWbyVyhJaQp6hZAMafM&usqp=CAU' alt='instagram logo' />
                <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()} />
                <div className='login-bar'>
                    <span></span>
                    OR
                    <span></span>
                </div>
                <button onClick={() => signAnonymous() }>Demo login</button>
            </div>
        </div>
    ) }
    else {
        return (
            <Redirect from='sign-in' to='/' />
        )
    }
} ;

export default Login ;
