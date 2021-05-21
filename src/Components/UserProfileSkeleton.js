import React, { useState } from 'react'
import {Skeleton} from 'antd' ;
import './UserProfileSkeleton.css' ;

export function UserProfileSkeleton() {
    let array = [1 , 2, 3 , 4] ;
    const [ minWidth , setMinWidth ] = useState('55vw') ;
    if (window.innerWidth <= 1070 && minWidth !=='100%' ) {
      setMinWidth('100%') ;
    }
    return (
        <div className='user-profile-top' style={{minWidth: minWidth}}>
            <Skeleton.Avatar className='user-profile-image' active size='large'/>
                <Skeleton.Button style={{width:'100%', marginTop:'40px', height: '30px'}} shape='square' active size='large' className='user-top-info' />
                <div className='user-description'>
                    <Skeleton paragraph={{rows: 4, width: '200px'}} active />
                </div>
        </div>
    )
} ;

export default UserProfileSkeleton ;
