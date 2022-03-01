import { memo,useEffect,useRef} from 'react'
import { useDispatch,useSelector,shallowEqual } from 'react-redux'
//components
import {Carousel} from 'antd'
import KyRecommendChildHeader from '@/components/theme-header-rcm'
import KyAlbumCover from '@/components/album-cover'
//action
import {getNewAlbumAction} from '../../store/actionCreator'
//less
import './index.less'


export default memo(function KyNewAlbum() {
    
    const carouselRef = useRef()
    const {newAlbums} = useSelector(state => {
        return {newAlbums:state.getIn(["recommend","newAlbums"])}
    },shallowEqual)

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getNewAlbumAction(10));
    }, [dispatch])

    
    return (
        <div>
            <KyRecommendChildHeader title="新碟上架"/>
            <div className="newAlbum-carousel-parent">
                <div className="newAlbum-carousel-inner-parent">
                    <div className="newAlbum-carousel-content">
                        <Carousel ref={carouselRef} dots={false} speed={1000}>
                        {
                            [0,1].map((value)=>{
                                return (
                                        <div key={value}>
                                            {
                                                newAlbums.slice(value*5,(value+1)*5).map((value,index)=>{
                                                    return <KyAlbumCover key={value.id} info={value} width="118px" height="100px" bgp="-570px" psize="22px" pbgp="-85px"/>
                                                })
                                            }   
                                        </div>
                                );
                            })
                        }
                        </Carousel>
                    </div>
                    <span onClick={(e)=>{carouselRef.current.prev()}} className="newAlbum-carousel-la sprite_02"></span>
                    <span onClick={(e)=>{carouselRef.current.next()}} className="newAlbum-carousel-ra sprite_02"></span>
                </div>
            </div>
        </div>
    )
})
