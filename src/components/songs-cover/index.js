import React, { memo } from 'react'

//utils
import {transformImg,playCountUtils} from '@/utils/format-utils'
//css
import './index.less'
export default memo(function KySongsCover(props) {
    const {info} = props;
    return (
        <div className="songs-cover-parent">
            <div className="songs-cover-top">
                <img src={transformImg(info.picUrl,140)} alt={info.copywriter}></img>
                <a className="songs-cover-top-msk sprite_cover" href="todo"> </a>
                <div className="songs-cover-top-playcount sprite_cover">
                    <a className="sprite_icon" href="todo"> </a>
                    <span className="sprite_icon"></span>
                    <span>{playCountUtils(info.playCount)}</span>
                </div>
            </div>
            <p className="songs-cover-bottom">
                <a href="todo">{info.name}</a>
            </p>
        </div>
    )
})
