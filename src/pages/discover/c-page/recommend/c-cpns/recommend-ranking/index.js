import React, { memo,useEffect } from 'react'
import { shallowEqual, useDispatch,useSelector } from 'react-redux'
//my components
import KyTopBanners from '@/components/theme-header-rcm'
import KyTopRanking from '@/components/top-ranking'
//action
import {getTopListAction} from '../../store/actionCreator'

//css
import './index.less'
export default memo(function KyRecommendRanking() {
    
    const {soaringList,publishingList,originalList} = useSelector(state => {
        return {
                    soaringList:state.getIn(["recommend","soaringList"]),
                    publishingList:state.getIn(["recommend","publishingList"]),
                    originalList:state.getIn(["recommend","originalList"]),
                }    
    },shallowEqual)
    const dispatch = useDispatch();
    //3779629 19723756 2884035  /playlist/detail?id=2884035 新歌飙升原创
    useEffect(() => {
        dispatch(getTopListAction("19723756"));
        dispatch(getTopListAction("3779629"));
        dispatch(getTopListAction("2884035"));
    }, [dispatch])

    return (
        <div>
            <KyTopBanners title="榜单"/>
            <div className="Ky-recommend-ranking-parent recommend-top-bg">
                <KyTopRanking info={soaringList}/>
                <KyTopRanking info={publishingList}/>
                <KyTopRanking info={originalList}/>
            </div>
        </div>
    )
})
