import { memo,useEffect, useState,useRef,useCallback} from 'react'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'
import {Carousel} from 'antd'

import {getTopBannersAction} from '../../store/actionCreator'


import './index.less'

function TopBanners(props) {
    const [currentIndex,setCurrentIndex]=useState(0);
    const bannerRef=useRef();
    const beforeChange=useCallback(
        (from,to) => {
            setCurrentIndex(to);
        },
        [],
    )
    //useSelector与useDispatch都是用react-redux中的，别导错成react中
    //不使用hooks自己实现mapStateToProps方法时，redux会浅层比较该方法里面的对象内容是否发生改变，若变重新渲染
    //但是useSelector是直接比较方法中返回的对象与上次返回的对象是否同一个对象，因为每次都调用了该方法，所以返回的对象不同
    //要在useSelector加上shalloEqual，比较内容的不同判断是否需要重新渲染
    // const {topBanners}=useSelector((state)=>({topBanners:state.recommend.banners}),shallowEqual);
    //因为使用了immutable所以对象的get，set方法都要改变，合并的reducers是一个im对象，单个reducer也是im对象
    const {topBanners}=useSelector((state)=>({topBanners:state.getIn(["recommend","banners"])}),shallowEqual);
    // const {topBanners}=useSelector((state)=>({topBanners:state.get("recommend").get("banners")}),shallowEqual);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getTopBannersAction());
    }, [dispatch])


// 其他业务逻辑
  const bgImage = topBanners[currentIndex] && (topBanners[currentIndex].imageUrl + "?imageView&blur=40x20")

    return (
        <div className="outer-bg" style={{background:`url(${bgImage}) center/6000px`}}>
            <div className="parent-wrap">
                <div className="carousel">
                    <Carousel effect="fade" dotPosition="bottom" autoplay="true" dots="true" ref={bannerRef} beforeChange={beforeChange}>
                        { 
                            topBanners.map((value,key)=>{
                                return (
                                    <div key={value.imageUrl} className="banner-item">
                                        <a href={value.url} >
                                            <img className="image" src={value.imageUrl} alt={value.typeTitle}/>
                                        </a>
                                    </div>
                                )
                            })
                        }
                    </Carousel>
                </div>
                <div className="download">
                    <a href="/download"> </a>
                    <p>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
                    <span className="shadow"></span>
                    <span className="shadowr"></span>
                </div>
                <span className="left-arrow" onClick={(e)=>{ bannerRef.current.prev()}} > </span>
                <span className="right-arrow" onClick={(e)=>{ bannerRef.current.next() }}> </span>
            </div>
        </div>
    )
}


export default memo(TopBanners);





































// function Recommend(props) {
//     const {mapState,getBanners} = props;
//     useEffect(() => {
//         getBanners();
//     }, []) 
//     return (
//         <div>
//             test
//             {console.log(mapState)}
//         </div>
//     )
// }

// function mapStateToProps(state){
// 	return {
//         mapState:state
//     }
// }
// function mapDispatchToProps(dispatch){
//     return {
//         getBanners:()=>{
//             dispatch(getTopBannersAction());
//         }
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(memo(Recommend));