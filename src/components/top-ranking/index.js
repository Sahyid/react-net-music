import React, { memo } from 'react'

import {useDispatch,} from 'react-redux'
//utils
import {transformImg} from '@/utils/format-utils'
//css
import './index.less'

//other action
import {getSongDetailAction} from '../bottom-player/store/actionCreator'
export default memo(function KyTopRanking(props) {
    const {info} = props


    const dispatch = useDispatch()
    const songPlay=(id)=>{
        dispatch(getSongDetailAction(id));
    }
    return (
        <div className="top-ranking-parent">
            <div className="top-ranking-header-parent">
                <div className="top-ranking-header-img">
                    {/* img要设置宽高比较好 */}
                    <img src={transformImg(info.coverImgUrl,80)} alt={info.name}></img> 
                    <a href="/todo" className="top-ranking-header-img-msk sprite_cover"> </a>
                </div>
                <div className="top-ranking-header-button">
                    <a href="/todo">
                        <h3>{info.name}</h3>
                    </a>
                    <div className="top-ranking-header-button-playandcollect">
                        <a href="todo" className="sprite_02"> </a>
                        <a href="todo" className="sprite_02"> </a>
                    </div>
                </div>
            </div>
            <div className="top-ranking-content">
                    {info.tracks?(info.tracks.slice(0,10).map((value,index)=>{
                            return (
                                <div key={value.id} className="top-ranking-content-item">
                                    <span>{index+1}</span>
                                    <div className="top-ranking-content-item-content">
                                        <p>{value.name}</p>
                                        <div className="top-ranking-content-item-icon">
                                            <a className="sprite_02" onClick={(e)=>{songPlay(value.id)}}> </a>
                                            <a href="todo" className="sprite_icon2"> </a>
                                            <a href="todo" className="sprite_02"> </a>
                                        </div>
                                    </div>
                                </div>
                            )
                        })):null}
                        
                    
                
            </div>
        </div>
    )
})
