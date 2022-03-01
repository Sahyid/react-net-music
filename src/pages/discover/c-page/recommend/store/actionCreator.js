import * as actions from './constant'

import {getTopBanners as getBanners,getHotrmc,getNewAlbum,getTopList,getSettleSingers,getArtistDetails,getHotAnchor} from '@/api/recommend'

//action
const changeTopBanners=(res)=>({
    type: actions.CHANGE_TOP_BANNERS,
    topBanners : res.banners,
})

const changeHotRecommendAction=(res)=>({
    type: actions.CHANGE_HOT_RECOMMEND,
    hotRecommend : res.result,
})

const changeNewAlbumAction=(res)=>({
    type: actions.CHANGE_NEW_ALBUM,
    newAlbums : res,
})
const changeSoaringListAction=(res)=>({
    type: actions.CHANGE_SOARING_LIST,
    soaringList : res.playlist,
})
const changePublishingListAction=(res)=>({ //新歌榜单
    type: actions.CHANGE_PUBLISHING_LIST,
    publishingList : res.playlist,
})
const changeOriginalListAction=(res)=>({
    type: actions.CHANGE_ORIGINAL_LIST,
    originalList : res.playlist,
})
const changeHotAnchorAction=(res)=>({
    type: actions.CHANGE_HOT_ANCHOR,
    hotAnchors : res.data.list,
})
//入驻歌手
const changeSettleSingersAction=(res)=>{
    return {
        type: actions.CHANGE_SETTLE_SINGERS,
        settleSingers : res,
    }
}
//getData
export const getTopBannersAction=()=>{
    return (dispatch)=>{
        getBanners().then((res)=>{
            dispatch(changeTopBanners(res));
            //dispatch后会将combineReducer中的所有reducer都处理一遍，
            //返回各个reducer中的值，如果变化就赋值,各个reducer中的state都会有赋值
        })
    }
}
export const getHotRecommendAction=(limit)=>{
    return (dispatch)=>{
        getHotrmc(limit).then((res)=>{
            //res.result
            dispatch(changeHotRecommendAction(res));
        })
    }
}

export const getNewAlbumAction=(limit)=>{
    return (dispatch)=>{
        getNewAlbum(limit).then((res)=>{
            dispatch(changeNewAlbumAction(res.weekData.slice(0,limit)));
        })
    }
}

export const getTopListAction=(id)=>{
    return (dispatch)=>{
        getTopList(id).then((res)=>{
            // console.log(res);
            // dispatch(changeNewAlbumAction(res.weekData.slice(0,limit)));
            switch(id){
                case '19723756':
                    dispatch(changeSoaringListAction(res))
                    break;
                case '3779629':
                    dispatch(changePublishingListAction(res))
                    break;
                case '2884035':
                    dispatch(changeOriginalListAction(res))
                    break;
                default:
                    break;

            }
        })
    }
}
export const getSettleSingersAction=(type,limit)=>{
    return (dispatch)=>{
        let newArr=[];
        getSettleSingers(type,limit).then((res)=>{
            res.artists.map((value,key)=>{
                return getArtistDetails(value.id).then(
                    (res)=>{
                        newArr.push(res)
                        if(newArr.length===limit){
                            dispatch(changeSettleSingersAction(newArr));
                        }
                    }
                )
            });
            
            
        })
        
    }
}

export const getHotAnchorAction=(limit)=>{
    return (dispatch)=>{
        getHotAnchor(limit).then((res)=>{
            dispatch(changeHotAnchorAction(res));
        })
    }
}
