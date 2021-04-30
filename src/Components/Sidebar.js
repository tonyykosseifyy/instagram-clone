import React, { useState , useEffect } from 'react'
import './Sidebar.css' ;
import { getUsersSuggestion } from '../fetch' ;
import { useSelector } from 'react-redux' ;
import Users from './Users' ;

function Sidebar() {
    const dark = useSelector(state => state.darkTheme)
    const [ userSuggestions , setUsersSuggestions ] = useState([]) ;
    const [ error , setError ] = useState(false) ;
    useEffect(() => {
        getUsersSuggestion( setUsersSuggestions , setError ) ;
    },[])
    console.log(userSuggestions , 'userssssss')
    return (
        <div className='sidebar' style={{ background : dark ? '#171717' : '#fafafa' , color: dark ? 'white' : 'inherit' , display: error && 'none'}} > 
    
            { !error && userSuggestions.length > 0 ? 
            <div>
                <h3>Suggestions For you</h3>
                { userSuggestions.map((item , index) => (
                    <Users key={index} user={item} />
                ))}
            </div>
            : null }
        </div>
    )
} ;

export default Sidebar ;