import Skeleton from '@material-ui/lab/Skeleton' ;
import React from 'react' ;

function PostSkeleton() {
    let arr = [ 1,2 , 3 ,4 , 5 ]
    return (
        <div style={{marginTop: '130px'}} className='user-profile-posts'>
            { arr.map((item , index) => (
                <Skeleton variant='rect' animation='wave' />
            ))}
        </div>
    )
}

export default PostSkeleton ;