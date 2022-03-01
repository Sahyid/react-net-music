import * as constantValue from './constant'

import {Map} from 'immutable'

const defaultState=Map({
    topListInfo:[],
    currentTopListDetail:{},
    currentTopListId:'',
    topListCMTCounts:0,
    topListCMTContents:[],
})

export const reducer=(state=defaultState,action)=>{
    switch(action.type){
        case constantValue.TOP_LIST_INFO:
            return state.set("topListInfo",action.topListInfo);
        case constantValue.TOP_LIST_DETAIL:
            return state.set("currentTopListDetail",action.topListDetail);
        case constantValue.CURRENT_TOP_LIST_ID:
            return state.set("currentTopListId",action.currentTopListId);
        case constantValue.TOP_LIST_CMT_COUNTS:
            return state.set("topListCMTCounts",action.topListCMTCounts);
        case constantValue.TOP_LIST_CMT_CONTENTS:
            return state.set("topListCMTContents",action.topListCMTContents);
        default:
            return state;
    }

}