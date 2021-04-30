import Skeleton from '@material-ui/lab/Skeleton' ;
import React from 'react' ;

function PostUserSkeleton() {
    let arr = [ 1,2 , 3 ,4 , 5 ]
    return (
        <div style={{marginTop: '130px'}} className='user-profile-posts'>
            { arr.map((item , index) => (
                <Skeleton variant='rect' animation='wave' height={250} width={350}  />
            ))}
        </div>
    )
}

export default PostUserSkeleton ;