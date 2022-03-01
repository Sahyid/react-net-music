import React, { memo,useEffect } from 'react'
import {useDispatch,useSelector,shallowEqual} from 'react-redux'
//action
import {getSettleSingersAction} from '../../store/actionCreator'
//css
import './index.less'
//util
import {transformImg} from '@/utils/format-utils'
export default memo(function KySettleSinger() {
    //react-redux
    const {singerItems} = useSelector(state => {
        return {singerItems:state.getIn(["recommend","settleSingers"])};
    },shallowEqual)
    const dispatch = useDispatch()
    //react
    useEffect(() => {
        dispatch(getSettleSingersAction(1,5));
    }, [dispatch])
    return (
        <div className="settleSinger-parent">
            <h3 className="settleSinger-top">
                <span>入驻歌手</span>
                <a href="todo">查看全部{">"}</a>
            </h3>
            <ul className="settleSinger-content">
                {
                    singerItems.map((value,key)=>{
                        
                        return (
                            <li key={value.data.artist.id} className="settleSinger-content-item">
                                <div className="settleSinger-content-item-content">
                                    <img src={transformImg(value.data.artist.cover,62)} alt={value.data.artist.id}></img>
                                    <div className="settleSinger-content-item-content-text">
                                        <span>{value.data.artist.name}</span>
                                        <p>{value.data.identify.imageDesc}</p>
                                    </div>
                                </div>
                                <a className="settleSinger-content-cover" href={value.data.artist.id}> </a>
                                {/* 覆盖div达到引用 */}
                            </li>
                        )
                    })
                }
            </ul>
            <button className="settleSinger-bottom-button sprite_button">
                <i className="sprite_button">申请成为网易音乐人</i>
            </button>
        </div>
    )
})
