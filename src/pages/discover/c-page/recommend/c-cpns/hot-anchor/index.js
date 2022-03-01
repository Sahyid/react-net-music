import React, { memo ,useEffect} from 'react'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'

//action 
import {getHotAnchorAction} from '../../store/actionCreator'
//less
import './index.less'
//utils
import {transformImg} from '@/utils/format-utils'

/**
 * 热门电台主播
 */
export default memo(function KyHotAnchor() {
    const {anchors} = useSelector(state => {
        return {anchors:state.getIn(["recommend","hotAnchors"])}
    },shallowEqual)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getHotAnchorAction(5))
    }, [dispatch])
    return (
        <div className="kyhotanchor-parent">
            <h3>热门主播</h3>
            <ul className="kyhotanchor-ul">
                {
                    anchors.map((value,key)=>{
                        return (
                            <li key={value.id} className="kyhotanchor-li">
                                <img src={transformImg(value.avatarUrl,40)} alt={value.nickName}></img>
                                <div className="kyhotanchor-text">
                                    <p>{value.nickName}</p>
                                </div>
                                <a href="todo"> </a>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
})
