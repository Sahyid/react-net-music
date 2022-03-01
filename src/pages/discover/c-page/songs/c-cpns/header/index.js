import React, { memo ,useState,useEffect} from 'react'
import KySongsChildrenCategories from '../children-categories'
import {getSongCategoryAction} from '../../store/actionCreator'

//less
import './index.less'
import { useDispatch } from 'react-redux'
export default memo(function KySongsHeader() {
    const [showCategory, setShowCategory] = useState(false)
    const dispatch=useDispatch();
    useEffect(() => {
        dispatch(getSongCategoryAction())
    }, [dispatch])
    return (
        <div className="songs-header-wrapper">
            <h3 className="songs-header-left">
                <span>全部</span>
                <a className="songs-header-selectbutton sprite_button" onClick={()=>{setShowCategory(!showCategory)}}>
                    <i className="sprite_button">
                        <span>选择分类</span>
                        <em className="sprite_icon2"></em>
                    </i>
                </a>
            </h3>
            <div className="songs-header-hot sprite_button2">
                <span>热门</span>
            </div>
            <div style={{position:"absolute",top:"40px",left:"-40px",zIndex:"5"}}>
                {showCategory?<KySongsChildrenCategories/>:null}
            </div>
        </div>
    )
})
