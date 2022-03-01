import {Map} from 'immutable'
import * as constantValue from './constant'

const defaultState = Map({
    songCategoryList:[],
    songCategoryListCounts:0,
    songCategories:[],
    songsCurrentCategory:'全部',
})

export const reducer=(state=defaultState,action)=>{
    switch(action.type){
        case constantValue.SONG_CATEGORY_LIST:
            return state.set("songCategoryList",action.songCategoryList);
        case constantValue.SONG_CATEGORY_LIST_COUNTS:
            return state.set("songCategoryListCounts",action.songCategoryListCounts);
        case constantValue.SONG_CATEGORIES:
            return state.set("songCategories",action.songCategories);
        case constantValue.CURRENT_CATEGORY:
            return state.set("songsCurrentCategory",action.currentCategory);
        default:
            return state;

    }
}