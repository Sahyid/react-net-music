import React, { memo, useEffect, useState } from 'react'
import { shallowEqual, useDispatch,useSelector } from 'react-redux'
import {Pagination} from 'antd'
//action
import {getSongCategoryListAction} from './store/actionCreator'
//cpt
import KySongsHeader from './c-cpns/header'
import KySongsCover from '@/components/songs-cover'

//less
import './index.less'
export default memo(function KySongs() {
    const { songCategoryList,songCategoryListCounts,songsCurrentCategory,  } = useSelector(state =>{
        return {
            songCategoryList:state.getIn(['songsList','songCategoryList']),
            songCategoryListCounts:state.getIn(['songsList','songCategoryListCounts']),
            songsCurrentCategory:state.getIn(['songsList','songsCurrentCategory']),
        }
    } ,shallowEqual);
    const dispatch=useDispatch();
    useEffect(
        ()=>{
           dispatch(getSongCategoryListAction());
        },[dispatch]
    );
    const changeCurrentPage=(page,pagesize)=>{
        dispatch(getSongCategoryListAction(songsCurrentCategory,(page-1)*pagesize,pagesize))
    }
    return (
        <div className="songs-wrapper">
            <div className="songs-parent">
                <KySongsHeader/>
            
                <div className="songs-songscover">
                    {
                        songCategoryList.map((value,key)=>{
                            value.picUrl=value.coverImgUrl;
                            return <KySongsCover key={value.id+"a"+key} info={value}/>
                        })
                    }
                </div>
                <Pagination defaultCurrent={1} total={songCategoryListCounts} hideOnSinglePage={false} size="small" pageSize={35} showSizeChanger={false} onChange={(page,pagesize)=>{changeCurrentPage(page,pagesize)}}/>
            </div>
        </div>
    )
})
