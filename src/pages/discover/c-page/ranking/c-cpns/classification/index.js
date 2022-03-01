import React, { memo ,useCallback} from 'react'
import {NavLink} from 'react-router-dom'

import {useDispatch} from 'react-redux'
//action creator
import {getTopListDetailAction} from '../../store/actionCreator'

//
//utils
import {transformImg} from '@/utils/format-utils'
//less
import './index.less'
export default memo(function KyRankingClassification(props) {
    const {info} =props;
    const dispatch = useDispatch();
    const navClickEvent=useCallback((id)=>{
        dispatch(getTopListDetailAction(String(id)));
    },[]) 
    return (
        <NavLink to={"/discover/ranking?"+info.id} onClick={(e)=>{navClickEvent(info.id)}}>
            <div className="ranking-classification-wrapper">
                <div className="ranking-classification-parent">
                    <div className="ranking-classification-img">
                        <img src={transformImg(info.coverImgUrl,40)}></img>
                        <span></span>
                    </div>
                    <p className="ranking-classification-name">
                        <span>{info.name}</span>
                    </p>
                    <p>{info.updateFrequency}</p>
                </div>
            </div>
        </NavLink>
    )
})
