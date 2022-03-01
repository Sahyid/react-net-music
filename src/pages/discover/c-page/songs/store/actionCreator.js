import {getSongCategoryList,getSongCategory} from '@/api/songs'
import {handleData} from '@/utils/format-utils'

import * as constantValue from './constant'

const createSongCategoryListAction=(list)=>{
    return {
        type:constantValue.SONG_CATEGORY_LIST,
        songCategoryList:list
    }
}
const createSongCategoryListCountsAction=(count)=>{
    return {
        type:constantValue.SONG_CATEGORY_LIST_COUNTS,
        songCategoryListCounts:count
    }
}
const createSongCategoriesAction=(res)=>{
    return {
        type:constantValue.SONG_CATEGORIES,
        songCategories:res
    }
}
const changeCurrentCategoryAction=(res)=>{
    return {
        type:constantValue.CURRENT_CATEGORY,
        currentCategory:res,
    }
}

export const getSongCategoryListAction=(cat, offset, limit)=>{
    return (dispatch,getState)=>{
        getSongCategoryList(cat,offset,limit).then((res)=>{
            dispatch(createSongCategoryListAction(res.playlists))
            dispatch(createSongCategoryListCountsAction(res.total))
        })
    }
}

export const getSongCategoryAction=()=>{
    return (dispatch)=>{
        getSongCategory().then((res)=>{
            res=handleData(res);
            dispatch(createSongCategoriesAction(res));
        })
    }
}
export const getCurentCategoryAction=(category)=>{
    return (dispatch)=>{
        getSongCategoryList(category).then((res)=>{
            dispatch(createSongCategoryListAction(res.playlists))
            dispatch(createSongCategoryListCountsAction(res.total))
            dispatch(changeCurrentCategoryAction(category));
        })
    }
}