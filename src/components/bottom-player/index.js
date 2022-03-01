import React, { memo,useEffect,useRef,useCallback,useState } from 'react'
import { shallowEqual, useDispatch ,useSelector} from 'react-redux'
import {Slider,message} from 'antd'
import {scrollTo} from '@/utils/ui-helper'

//actionCreator
import {changeCurrentIndexAndSongAction, getSongDetailAction,getSongUrlAction,changeSequenceAction,changeCurrentLyricIndexAction} from './store/actionCreator'
//utils
import {transformImg,formatDate} from '@/utils/format-utils'

//less
import './index.less'
export default memo(function KyBottomPlayer() {
    //useState
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime,setCurrentTime] = useState(0);//音乐播放时间进度
    const [progress,setProgress] = useState(0);
    const [isChanging,setIsChanging] = useState(false);
    const [methodIndex,setMethodIndex]=useState(0);//播放方式的索引
    const [isShowPlayList,setIsShowPlayList]=useState(false);

    //ref
    const audioRef=useRef();
    const scrollRef=useRef();
    

    //redux
    const {songDetail,songUrl,playList,currentLyricIndex,lyricList,currentSongIndex} = useSelector(state => {
        return {
            playList:state.getIn(['bottomPlayer','playList']),
            songDetail:state.getIn(['bottomPlayer','songDetail']),
            songUrl:state.getIn(['bottomPlayer','songUrl']),
            currentLyricIndex:state.getIn(['bottomPlayer','currentLyricIndex']),
            lyricList:state.getIn(['bottomPlayer','lyricList']),
            currentSongIndex:state.getIn(["bottomPlayer", "currentSongIndex"]),

        }
    },shallowEqual)
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getSongDetailAction('1894094482'));
    }, [dispatch]);
    
    useEffect(()=>{
        // audioRef.current.src="http://m8.music.126.net/20211128163503/199025e60f665cb3213ab162a8141fca/ymusic/0fd6/4f65/43ed/a8772889f38dfcb91c04da915b301617.mp3"
        dispatch(getSongUrlAction(songDetail.id!=undefined?songDetail.id:"33894312"));//33894312
    },[songDetail])
    
    useEffect(()=>{
        audioRef.current.src=(songUrl!=undefined&&songUrl[0]!=undefined)?songUrl[0].url:null;
    },[songUrl])

    //歌词滚动
    useEffect(
        ()=>{
            if(currentLyricIndex<3) return;
            scrollTo(scrollRef.current,(currentLyricIndex-3)*32,300);//300ms移动内到下一句歌词,32为单句歌词高度32px
        },
        [currentLyricIndex]
    )
    //other state
    const duration = songDetail?songDetail.dt:0;
    const showDuration = formatDate(duration, "mm:ss");
    const showCurrent = formatDate(currentTime,"mm:ss");
    
    //other handle
    const playButton=useCallback(
        () => {
            isPlaying ? audioRef.current.pause(): audioRef.current.play();
            setIsPlaying(!isPlaying);
        },
        [isPlaying],//如果不使用isPlaying的话，函数的状态永远会被保存即isplay没有获得最新的值
    )
    const progressUpdate=useCallback((e)=>{
        if(!isChanging){
            const current=e.target.currentTime;
            setCurrentTime(current*1000);
            setProgress(current*1000/duration*100);
        }
        // 获取当前的歌词
        let i = 0;
        for (; i < lyricList.length; i++) {//遍历歌词数组
          let lyricItem = lyricList[i];
          if (currentTime  < lyricItem.time) {
            break;
          }
        }
        if (currentLyricIndex !== i - 1) {//i表示的是下一句，i-1为当前句
          dispatch(changeCurrentLyricIndexAction(i - 1));
          const content = lyricList[i - 1] && lyricList[i - 1].content
          message.open({
            key: "lyric",
            content: content,
            duration: 0,
            className: "lyric-class"
          })
        }
        
    },[duration,isChanging,lyricList,currentTime])

    const onChangeEvent=((value)=>{
        setIsChanging(true);
        const current = value / 100 * duration;
        setCurrentTime(current);
        setProgress(value);
    })

    const afterChangeEvent=useCallback((value)=>{
        const current = value / 100 * duration / 1000;
        audioRef.current.currentTime=current;
        setIsChanging(false);
    },[duration])

    const changeSong=useCallback((tag)=>{
        dispatch(changeCurrentIndexAndSongAction(tag));
    },[])

    const pleyMethodArray=['loopPlay','randomPlay','singlePlay'];
    const changeMethodIndex=()=>{
        setMethodIndex((methodIndex+1)%3);
        dispatch(changeSequenceAction(methodIndex));
    }

    const songEndEvent=()=>{
        if (methodIndex === 2) { // 单曲循环
            audioRef.current.currentTime = 0;
            audioRef.current.play();
          } else {
            dispatch(changeCurrentIndexAndSongAction(1));
          }
    }
    const liPlayButton=useCallback((id)=>{
        dispatch(changeCurrentIndexAndSongAction(id));
    },[])
    //html
    return (
        <div className="bottom-player-wrapper">
            <div className="bottom-player-parent">
                {/* 切换、暂停歌曲键 */}
                <div className="bottom-player-button">
                    <a className="playbar_sprite" onClick={(e)=>{changeSong(-1)}}></a>
                    <a className={"playbar_sprite "+(!isPlaying?"bottom-player-button-playbutton":"bottom-player-button-pausebutton")} onClick={()=>{playButton()}}></a>
                    <a className="playbar_sprite" onClick={(e)=>{changeSong(+1)}}></a>
                </div>
                <div className="bottom-player-img">
                    <img src={transformImg(songDetail.al!=undefined?songDetail.al.picUrl:"",34)}></img>
                    <a href="/#"> </a>
                </div>
                <div className="bottom-player-process">
                    <div className="bottom-player-process-word">
                        <a href="/id">{songDetail.name?songDetail.name:""}</a>
                        <span>{songDetail.ar!=undefined?songDetail.ar[0].name:""}</span>
                        <a className="playbar_sprite" href="todo"> </a>
                    </div>
                    {/* 进度条 */}
                    <div className="bottom-player-process-bar">
                        {/* onAfterChange={(value)=>{afterChangeEvent(value)}} */}
                        <Slider tooltipVisible={false} value={progress} onChange={(value)=>{onChangeEvent(value)}} onAfterChange={(value)=>{afterChangeEvent(value)}}></Slider>
                    </div>
                    <span className="bottom-player-process-bar-number">
                            <em>{showCurrent}</em>
                            { "/ "+showDuration}
                    </span>
                </div>
                <div className="bottom-player-function-icon">
                    <a className="processBar_functionIcon01" href="/todo">&nbsp;</a>
                    <a className="playbar_sprite" href="/todo"> &nbsp;</a>
                    <a className="playbar_sprite" href="/todo"> &nbsp;</a>
                </div>
                <div className="bottom-player-right-icon playbar_sprite">
                    <a className="bottom-player-right-icon-volumn playbar_sprite" href="/todo"> &nbsp;</a>
                    <a className={"bottom-player-right-icon-loop playbar_sprite "+pleyMethodArray[methodIndex]} onClick={(e)=>{changeMethodIndex()}}> &nbsp;</a>
                    <span className="bottom-player-right-icon-list" onClick={()=>{setIsShowPlayList(!isShowPlayList)}}>
                        <a className="playbar_sprite" ><span>{playList.length}</span></a>
                    </span>
                </div>
                <div className="bottom-player-playlist" style={{display:(isShowPlayList?"block":"none")}}>
                    <div className="bottom-player-playlist-header">
                        <h4>
                            播放列表({playList.length})
                        </h4>
                        <a className="bottom-player-playlist-collection">
                            <span className="playlist"></span>
                            收藏全部
                        </a>
                        <span></span>
                        <a className="bottom-player-playlist-clear">
                            <span className="playlist"></span>
                            清除
                        </a>
                        <p>{songDetail.name?songDetail.name:""}</p>
                        <span className="playlist bottom-player-list-close" onClick={()=>{console.log("关闭");setIsShowPlayList(false)}}>关闭</span>
                    </div>
                    <div className="bottom-player-playlist-main">
                        {/* <img src={"https://music.163.com/api/img/blur/"+(songDetail.al!=undefined?songDetail.al.pic_str:"")}></img> */}
                        {/* 左边 */}
                        <div className="bottom-player-playlist-main-left">
                            <ul>
                                {
                                    playList.map((value,key)=>{
                                        return (
                                            <li className={"bottom-player-playlist-main-left-li"+(currentSongIndex==key?" activeLi":"")} key={value.id} onClick={(e)=>{liPlayButton(value.id)}}>
                                                <div className="bottom-player-playlist-main-left-play">

                                                </div>
                                                <div className="bottom-player-playlist-main-left-name">
                                                    {value.name}
                                                </div>
                                                <div className="bottom-player-playlist-main-left-icon">
                                                    <div className="bottom-player-playlist-main-left-icon-i">
                                                        <i className="playlist"></i>
                                                        <i className="playlist"></i>
                                                        <i className="playlist"></i>
                                                        <i className="playlist"></i>
                                                    </div>
                                                </div>
                                                <div className="bottom-player-playlist-main-left-singer">
                                                    {value.ar[0].name}
                                                </div>
                                                <div className="bottom-player-playlist-main-left-time">
                                                    {showDuration}
                                                </div>
                                                <div className="bottom-player-playlist-main-left-source">
                                                    <a className="playlist"></a>
                                                </div>
                                            </li>
                                        )
                                    })
                                }

                            </ul>
                        </div>
                        {/* 中间 */}
                        <div></div>
                        {/* 问号 */}
                        <div></div>
                        {/* 右边 */}
                        <div className="bottom-player-playlist-main-mask2" ref={scrollRef}>
                            <div className="bottom-player-playlist-main-right">
                                {lyricList.map((value,key)=>{
                                    return (<p className={currentLyricIndex===key?"bottom-player-playlist-main-right-active":"bottom-player-playlist-main-right-p"} key={value.time}>{value.content}</p>)
                                })}
                            </div>
                        </div>
                        {/* 右边滚动条 */}
                        <div></div>
                    </div>
                </div>
            </div>    
            <audio ref={audioRef} onTimeUpdate={(e)=>{progressUpdate(e)}} onEnded={(e)=>{songEndEvent()}}></audio>        
        </div>
    )
    
})
