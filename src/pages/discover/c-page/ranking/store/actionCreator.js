import {getTopListInfo,getTopListDetail,getTopListCMTCounts,getTopListCMTContents} from '@/api/ranking'

import * as constantValue from './constant'
//create action
const createTopListInfoAction=(res)=>{
    return {
        type:constantValue.TOP_LIST_INFO,
        topListInfo:res,
    }
}
const createTopListDetailAction=(res)=>{
    return {
        type:constantValue.TOP_LIST_DETAIL,
        topListDetail:res,
    }
}
const changeCurrentTopListIDAction=(id)=>{
    return {
        type:constantValue.CURRENT_TOP_LIST_ID,
        currentTopListId:id,
    }
}
const changeTopListCMTCountsAction=(count)=>{
    return {
        type:constantValue.TOP_LIST_CMT_COUNTS,
        topListCMTCounts:count,
    }
}
const changeTopListCMTContentsAction=(contents)=>{
    return {
        type:constantValue.TOP_LIST_CMT_CONTENTS,
        topListCMTContents:contents,
    }
}

//get Info
export const getTopListInfoAction=()=>{
    return (dispatch)=>{
        getTopListInfo().then((res)=>{
            dispatch(createTopListInfoAction(res.list));
        })
    }
}

export const getTopListDetailAction=(id)=>{
    return (dispatch,getState)=>{
        let currentId=getState().getIn(['ranking','currentTopListId']);
        if(currentId===id) return;
        getTopListDetail(id).then((res)=>{
            dispatch(changeCurrentTopListIDAction(id));
            dispatch(createTopListDetailAction(res.playlist));
        })
    }
}

export const getTopListCMTCountsAction=(id)=>{
    return (dispatch)=>{
        getTopListCMTCounts(id).then((res)=>{
            dispatch(changeTopListCMTCountsAction(res.commentCount));
        })
    }
}
export const getTopListCMTContentsAction=(id,limit,offset)=>{
    return (dispatch)=>{
        getTopListCMTContents(id,limit,offset).then((res)=>{
            dispatch(changeTopListCMTContentsAction(res.comments));
        })
    }
}





