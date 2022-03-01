import React, { memo ,Fragment} from 'react'
import {shallowEqual, useDispatch, useSelector} from 'react-redux'

import {getCurentCategoryAction} from '../../store/actionCreator'
//less
import './index.less'
export default memo(function KySongsChildrenCategories(){
    const dispatch = useDispatch();
    const {songCategories} = useSelector(state => {
        return {
            songCategories:state.getIn(["songsList","songCategories"]),
        }
    },shallowEqual)

    const changeCurentCategory=(category)=>{
        dispatch(getCurentCategoryAction(category));
    }
    return (
        <div className="songs-children-categories-wrapper">
            <div className="songs-children-categories-wrapper-head categories_border">
                <i className="sprite_icon"></i>
            </div>
            <div className="songs-children-categories-wrapper-body categories_border">
                <h3>
                    <button className="sprite_button2">全部风格</button>
                </h3>
                {songCategories.map((value,index)=>{
                    return (
                        <dl className="songs-children-categories-wrapper-body-cnt" key={value.name}>
                            <dt className="songs-children-categories-wrapper-body-cnt-cat">
                                <i className={"sprite_icon2 "+"ui-icon-"+index}></i>
                                <span>{value.name}</span>
                            </dt>
                            <dd className="songs-children-categories-wrapper-body-cnt-child" >
                                {value.subs.map((subValue)=>{
                                    return (
                                        <Fragment key={subValue.name}>
                                            <a href="#" onClick={()=>{changeCurentCategory(subValue.name)}}>{subValue.name}</a>
                                            <span>|</span>
                                        </Fragment>
                                    )
                                })}
                            </dd>
                        </dl>
                    )
                })}
                
            </div>
            <div className="songs-children-categories-wrapper-foot categories_border">

            </div>
            
        </div>
    )
})
