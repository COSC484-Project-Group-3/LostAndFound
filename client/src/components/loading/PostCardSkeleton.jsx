import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
import './../posts/PostCard.css';

const PostCardSkeleton = () => {
    return (
            <div className="post-card" style={{marginTop:'50px'}}>
                <div className="post-card-img-container">
                    <Skeleton className='post-card-img' height={300} width={'100%'}/>
                </div>
                    <Skeleton className='post-card-title' height={20} width={200} />
                    <Skeleton className='post-card-compensation' height={20} width={100} />
                    <Skeleton className='post-card-distance' height={20} width={140} />
            </div>
    );

};

export default PostCardSkeleton;
