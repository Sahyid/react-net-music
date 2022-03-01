import React, { memo } from 'react'
import PropTypes from 'prop-types'

import './index.less'
/**
 * 推荐中的子头部
 */
function KyRecommendChildHeader(props) {
    const {title,keywords}=props;
    var length=keywords.length;
    return (
        <div className="recommend-child-header-parent sprite_02">
            <div className="recommend-child-header-left">
                <a href="todo" style={{fontSize: "20px",fontWeight: "normal",lineHeight:"28px"}}>{title}</a>
                <div className="recommend-child-header-item">
                    {   
                        keywords.map((value,index)=>{
                            if(length-1===index){
                                return (
                                        <div key={index} className="item">
                                            <a href="todo1">{value}</a>
                                        </div>
                                        
                                    )
                            }else{
                                return (
                                    <div key={index} className="item">
                                            <a href="todo1">{value}</a>
                                            <span style={{margin:"0 10px"}}>|</span>
                                    </div>
                                    
                                )
                            }
                        })
                    }
                </div>
            </div>
            <div className="recommend-child-header-right">
                <a href="/discover/playlist/">更多</a>
                <i className="sprite_02">&nbsp;</i>
            </div>
        </div>
    )
}
KyRecommendChildHeader.propTypes={
    title:PropTypes.string.isRequired,
    keywords:PropTypes.array
}
KyRecommendChildHeader.defaultProps={
    keywords:[]
}

export default memo(KyRecommendChildHeader)
