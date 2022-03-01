//util
import {getRandomNumber} from '@/utils/math-utils'
//constant
import * as constant from './constant';
//reuqest
import {
    getSongDetail,
    getSongUrl
} from '@/api/recommend'
import {
    getSongLyric
} from '../../../api/recommend';
//util
import {
    parseLyric
} from '@/utils/parse-lyric'

//action
const changeSongDetailAction = (res) => {
    return {
        type: constant.CHANGE_SONG_DETAIL,
        songDetail: res
    }
}
const createSongUrlAction = (res) => {
    return {
        type: constant.CHANGE_SONG_URL,
        songUrl: res.data
    }

}
const createLyricAction = (res) => {
    return {
        type: constant.CHANGE_SONG_LYRIC,
        lyricList: res
    }

}
const changePlayListAction=(res)=>{
    return {
        type:constant.CHANGE_PLAY_LIST,
        playList:res
    }
}

const changeCurrentSongIndexAction = (index) => {
    return {
        type: constant.CHANGE_CURRENT_SONG_INDEX,
        currentSongIndex:index,
    }

}
export const changeSequenceAction = (sequence) => ({
    type: constant.CHANGE_SEQUENCE,
    sequence
  });
  
  export const changeCurrentLyricIndexAction = (index) => ({
    type: constant.CHANGE_CURRENT_LYRIC_INDEX,
    index
  })

//resolve action
export const getSongDetailAction = (ids) => {
    return (dispatch, getState) => {
        // 1.根据id查找playList中是否已经有了该歌曲
        const playList = getState().getIn(["bottomPlayer", "playList"]);
        const songIndex = playList?playList.findIndex(song => song.id === ids):-1;
        // 2.判断是否找到歌曲
        let song = null;
        if (songIndex !== -1) { // 查找歌曲
            dispatch(changeCurrentSongIndexAction(songIndex));
            song = playList[songIndex];//获取该歌曲的详细信息
            dispatch(changeSongDetailAction(song));//改变当前播放的歌曲
            dispatch(getLyricAction(song.id));
        } else { // 没有找到歌曲
            // 请求歌曲数据
            // getSongDetail(ids).then((res) => {
            //     dispatch(changeSongDetailAction(res));
            // })
            getSongDetail(ids).then(res => {
                song = res.songs && res.songs[0];
                if (!song) return;
                // 1.将最新请求到的歌曲添加到播放列表中
                const newPlayList = [...playList];
                newPlayList.push(song);//放到最后
                // 2.更新redux中的值
                dispatch(changePlayListAction(newPlayList));
                dispatch(changeCurrentSongIndexAction(newPlayList.length - 1));
                dispatch(changeSongDetailAction(song));//改变当前播放的歌曲
                // 3.请求歌词
                dispatch(getLyricAction(song.id));
            })
        }
        
    }
}
export const getSongUrlAction = (id) => {
    return (dispatch) => {
        getSongUrl(id).then((res) => {
            dispatch(createSongUrlAction(res));
        })
    }
}


//获取歌词并解析成对象数组
export const getLyricAction = (id) => {
    return (dispatch) => {
        getSongLyric(id).then((res) => {
            // console.log(res);
            var lyricList = parseLyric(res.lrc.lyric);
            dispatch(createLyricAction(lyricList));
        })
    }
}

/*
*   切换歌曲
*/
export const changeCurrentIndexAndSongAction = (tag) => {
    return (dispatch, getState) => {
      const playList = getState().getIn(["bottomPlayer", "playList"]);
      const sequence = getState().getIn(["bottomPlayer", "sequence"]);
      let currentSongIndex = getState().getIn(["bottomPlayer", "currentSongIndex"]);
      
      switch (sequence) {
        case 1: // 随机播放
          let randomIndex = getRandomNumber(playList.length);
          while (randomIndex === currentSongIndex) {
            randomIndex = getRandomNumber(playList.length);//避免重复，也可以新建一个新的播放列表，全部随机后的数据放入，最后一个一个取出（不会重复）
          }
          currentSongIndex = randomIndex;
          break;
        default: // 顺序播放
          currentSongIndex += tag;
          if (currentSongIndex >= playList.length) currentSongIndex = 0;
          if (currentSongIndex < 0) currentSongIndex = playList.length - 1;
      }
      const currentSong = playList[currentSongIndex];
      dispatch(changeSongDetailAction(currentSong));
      dispatch(changeCurrentSongIndexAction(currentSongIndex));
      // 请求歌词
      dispatch(getLyricAction(currentSong.id));
    }
  }