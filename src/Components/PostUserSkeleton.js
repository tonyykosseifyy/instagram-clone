import {Skeleton} from 'antd' ;
import React, { useState , useEffect } from 'react' ;
import { PostContainerGrid } from './UserProfile.js' ;

function PostUserSkeleton() {
    let arr = [ 1,2 , 3 ,4 , 5 ] ;
    const [height , setHeight ] = useState(200) ;
    useEffect(() => {
      if (window.innerWidth > 1124 ) {
        setHeight(220)
      } else if ( window.innerWidth <= 1124 && window.innerWidth > 800 ) {
        setHeight(190)
      } else if ( window.innerWidth <= 800 && window.innerWidth > 500 ) {
        setHeight(150)
      } else if (window.innerWidth <= 500 ) {
        setHeight(100)
      }
    },[])
    return (
        <PostContainerGrid style={{width: '100%' , gridTemplateRows: `repeat(2 , ${height}px)`}}>
            { arr.map((item , index) => (
                <Skeleton.Image shape='square' active key={index} />
            ))}
        </PostContainerGrid>
    )
}

export default PostUserSkeleton ;
