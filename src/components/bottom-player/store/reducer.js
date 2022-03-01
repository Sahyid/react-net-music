import * as constant from './constant'
import {
    Map
} from 'immutable'

const defaultState = Map({
    playList: [],
    currentSongIndex: 0,
    songDetail: {},
    lyricList: [],
    songUrl: [],
    currentLyricIndex: 0,
    sequence:0,// 0 循环 1 随机 2 单曲
})
let KyBottomPlayerReducer = (state = defaultState, action) => {
    switch (action.type) {
        case constant.CHANGE_SONG_DETAIL:
            return state.set("songDetail", action.songDetail);
        case constant.CHANGE_PLAY_LIST:
            return state.set("playList", action.playList);
        case constant.CHANGE_SONG_URL:
            return state.set("songUrl", action.songUrl);
        case constant.CHANGE_SONG_LYRIC:
            return state.set("lyricList", action.lyricList);
        case constant.CHANGE_CURRENT_SONG_INDEX:
            return state.set("currentSongIndex", action.currentSongIndex);
        case constant.CHANGE_CURRENT_LYRIC_INDEX:
            return state.set("currentLyricIndex", action.index);
        case constant.CHANGE_SEQUENCE:
            return state.set("sequence", action.sequence);
        default:
            return state;
    }
}
export default KyBottomPlayerReducer;