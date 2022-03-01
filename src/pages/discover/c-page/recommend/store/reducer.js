import {Map} from 'immutable'

import * as actionTypes from './constant'
const defaultState=Map({
    banners:[],
    hotrmc:[],
    newAlbums:[],
    soaringList:[],
    publishingList:[],
    originalList:[],
    settleSingers:[],
    hotAnchors:[],
})

export function reducer(state=defaultState,action){
    switch(action.type){
        case actionTypes.CHANGE_TOP_BANNERS:
            return state.set("banners",action.topBanners);
        case actionTypes.CHANGE_HOT_RECOMMEND:
            return state.set("hotrmc",action.hotRecommend);
        case actionTypes.CHANGE_NEW_ALBUM:
            return state.set("newAlbums",action.newAlbums);    
        case actionTypes.CHANGE_SOARING_LIST:
            return state.set("soaringList",action.soaringList);    
        case actionTypes.CHANGE_PUBLISHING_LIST:
            return state.set("publishingList",action.publishingList);    
        case actionTypes.CHANGE_ORIGINAL_LIST:
            return state.set("originalList",action.originalList);  
        case actionTypes.CHANGE_SETTLE_SINGERS:
            return state.set("settleSingers",action.settleSingers);  
        case actionTypes.CHANGE_HOT_ANCHOR:
            return state.set("hotAnchors",action.hotAnchors);  
        default:
            return state;
    }
}