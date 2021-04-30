import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton' ;
import './UserProfileSkeleton.css' ;

export function UserProfileSkeleton() {
    let array = [1 , 2, 3 , 4] ;
    return (
        <div className='user-skeleton-top'>
            <Skeleton variant='circle' animation='wave' width={180} height={180} />
            <div className='user-skeleton-right'>
                <Skeleton variant='rect' animation='wave' width={530} height={55} />
                <div className='user-skeleton-bottom'>
                    { array.map(( item , index) => (
                        <Skeleton variant='text' animation='wave' width={400} />    
                    ))}
                </div>
            </div>

        </div>
    )
} ;

export default UserProfileSkeleton ;