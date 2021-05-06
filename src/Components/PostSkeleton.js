import Skeleton from '@material-ui/lab/Skeleton' ;
import React from 'react' ;
import { PostContainerGrid } from './UserProfile.js' ;


function PostSkeleton() {
    let arr = [ 1,2 , 3 ,4 , 5 ]
    return (
        <PostContainerGrid >
            { arr.map((item , index) => (
                <Skeleton variant='rect' animation='wave' />
            ))}
        </PostContainerGrid>
    )
}

export default PostSkeleton ;
