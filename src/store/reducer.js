import { combineReducers } from 'redux-immutable'

import {reducer as recommendReducer} from '@/pages/discover/c-page/recommend/store/index'
import {reducer as bottomPlayerReducer} from '@/components/bottom-player/store/index'
import {reducer as rankingReducer} from '@/pages/discover/c-page/ranking/store/index'
import {reducer as songsListReducer} from '@/pages/discover/c-page/songs/store/index'
//使用redux-immutable中的combineReducers而不是redux中
export default combineReducers({
    recommend:recommendReducer,
    bottomPlayer:bottomPlayerReducer,
    ranking:rankingReducer,
    songsList:songsListReducer,
})