import React, { memo,useEffect } from 'react'
import {shallowEqual, useDispatch,useSelector} from 'react-redux'
import {getHotRecommendAction} from '../../store/actionCreator'
import KyRecommendChildHeader from '@/components/theme-header-rcm'
import KySongsCover from '@/components/songs-cover'

//css
import './index.less'
export default memo(function KyHotRecommend() {
    const {hotRecommends} = useSelector(state => {
        return {hotRecommends:state.getIn(["recommend","hotrmc"])}
    },shallowEqual)
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getHotRecommendAction(8));
    }, [dispatch])
    return (
        <div>
            <KyRecommendChildHeader title="热门推荐" keywords={["华语","流行","摇滚","民谣","电子"]} />
            <div className="KyHotRecommend-item-parent">
                {
                    hotRecommends.map((value,index)=>{
                        return (
                            <KySongsCover key={value.id} info={value}/>
                        )
                    })
                }
            </div>
        </div>
    )
})
