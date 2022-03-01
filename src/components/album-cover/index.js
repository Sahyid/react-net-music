import React, { memo } from 'react'

//less
import './index.less'
//utils
import {transformImg} from '@/utils/format-utils.js'
export default memo(function KyAlbumCover(props) {
    const {info,width,height,bgp,psize,pbgp} =props;//信息 图宽 图高 mask精灵图的位置 播放键尺寸 播放键精灵图位置
    return (
        <div className="newalbum-parent">
            <div className="newalbum-img-context" style={{width:width,height:height}}>
                <img src={transformImg(info.picUrl,height.slice(0,height.length-2))} alt={info.name}></img>
                <a className="newalbum-img-msk sprite_cover" style={{width:width,height:height,backgroundPosition:`0px ${bgp}`}}> </a>
                <a className="newalbum-img-player-icon sprite_icon" style={{width:psize,height:psize,backgroundPosition:`0px ${pbgp}`}}> </a>
            </div>
            <p style={{fontSize:"12px",color:"#000"}}>{info.name}</p>
            <p style={{fontSize:"12px",color:"#666"}}>{info.artist.name}</p>
        </div>
    )
})
