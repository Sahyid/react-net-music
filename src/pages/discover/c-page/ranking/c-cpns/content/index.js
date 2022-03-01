import React, { memo, useEffect ,useCallback} from 'react'
import { shallowEqual, useDispatch, useSelector} from 'react-redux';
import { Avatar, Form, Button,Input,Row,Col,Pagination  } from 'antd';
import { UserOutlined } from '@ant-design/icons';
//utils
import {transformImg,formatMinuteSecond} from '@/utils/format-utils'
//action
import {getTopListDetailAction,getTopListCMTCountsAction,getTopListCMTContentsAction} from '../../store/actionCreator'

import './index.less';

export default memo(function KyRankingClassificationContent() {
    //redux
    const dispatch=useDispatch();
    useEffect(()=>{//初始化
        dispatch(getTopListDetailAction('19723756'));
        dispatch(getTopListCMTCountsAction('19723756'));
        dispatch(getTopListCMTContentsAction('19723756',16,(1-1)*0));
    },[dispatch]);

    const {currentTopListId,currentTopListDetail,topListCMTCounts,topListCMTContents}=useSelector((state)=>{
        return {
            currentTopListId:state.getIn(['ranking','currentTopListId']),
            currentTopListDetail:state.getIn(['ranking','currentTopListDetail']),
            topListCMTCounts:state.getIn(['ranking','topListCMTCounts']),
            topListCMTContents:state.getIn(['ranking','topListCMTContents']),
        }
    },shallowEqual);

    //other handle
    const { TextArea } = Input;
    const [form]=Form.useForm();
    
    const onTextChange=()=>{

    }
    const onCommentSubmit=()=>{
        
    }
    const textValue="";
    const dateUtil=useCallback(
        (milSecond) => {
            var d=new Date(milSecond);
            return (d.getMonth()+1)+"月"+d.getDate()+"日";
        },
        [],
    )
    const changeCurrentPage=useCallback((page,limit)=>{
        dispatch(getTopListCMTContentsAction(currentTopListId,limit,(page-1)*limit));
    },[currentTopListId])


    return (
        <div className="ranking-classification-content-wrapper">
            <div className="ranking-classification-content-header">
                <div className="ranking-classification-content-header-child">
                    <div className="ranking-classification-content-header-child-photo">
                        <img src={currentTopListDetail.coverImgUrl?transformImg(currentTopListDetail.coverImgUrl,150):""}></img>
                        <span className="sprite_cover"></span>
                    </div>
                    <div className="ranking-classification-content-header-child-cnt">
                        <div className="ranking-classification-content-header-child-cnt-main">
                            <div>
                                <h2>{currentTopListDetail.name?currentTopListDetail.name:""}</h2>
                            </div>
                            <div className="ranking-classification-content-header-child-cnt-main-time">
                                <i className="sprite_icon2"></i>
                                <span>最近更新：{dateUtil(currentTopListDetail.updateTime?currentTopListDetail.updateTime:1638923679526)}</span>
                                <span>（刚刚更新）</span>
                            
                            </div>
                            <div className="ranking-classification-content-header-child-cnt-main-button">
                                <a className="sprite_button ranking-classification-content-header-child-cnt-main-button-play">
                                    <i className="sprite_button">
                                        <em className="sprite_button"></em>
                                        播放
                                    </i>
                                </a>
                                <a className="sprite_button ranking-classification-content-header-child-cnt-main-button-plus">

                                </a>
                                <a className="sprite_button ranking-classification-content-header-child-cnt-main-button-collection">
                                    <i className="sprite_button">({currentTopListDetail.subscribedCount})</i>
                                </a>
                                <a className="sprite_button ranking-classification-content-header-child-cnt-main-button-share">
                                    <i className="sprite_button">({currentTopListDetail.shareCount})</i>
                                </a>
                                <a className="sprite_button ranking-classification-content-header-child-cnt-main-button-download">
                                    <i className="sprite_button">下载</i>
                                </a>
                                <a className="sprite_button ranking-classification-content-header-child-cnt-main-button-comment">
                                    <i className="sprite_button">(<span id="comment-count">{currentTopListDetail.commentCount}</span>)</i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="ranking-classification-content-main">
                <div className="ranking-classification-content-main-header">
                    <h3>歌曲列表</h3>
                    <span>100首歌</span>
                    <div className="ranking-classification-content-main-header-playcount">
                        播放:<strong>{currentTopListDetail.playCount}</strong>次
                    </div>
                </div>
                <div className="ranking-classification-content-main-list">
                    <div className="ranking-classification-content-main-list-table">
                        <table>
                            <thead className="ranking-classification-content-main-list-table-head">
                                <tr>
                                    <th className="sprite_table"></th>
                                    <th className="sprite_table">
                                        <div className="sprite_table ranking-classification-content-main-list-table-wp">标题</div>
                                    </th>
                                    <th className="sprite_table">
                                        <div className="sprite_table ranking-classification-content-main-list-table-wp">时长</div>
                                    </th>
                                    <th className="sprite_table">
                                        <div className="sprite_table ranking-classification-content-main-list-table-wp">歌手</div>
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="ranking-classification-content-main-list-table-body">
                                {currentTopListDetail.tracks?currentTopListDetail.tracks.map((value,key)=>{
                                    return (
                                    <tr key={value.id} style={key%2===1?{backgroundColor:"#fff"}:{}}>
                                        <td>
                                            <div style={{textAlign:"center"}}>
                                                <span>{key+1}</span>
                                                {/* <span className="sprite_icon2">18</span> */}
                                            </div>
                                        </td>
                                        <td>
                                            <div>
                                                {(key<3)?<a className="ranking-classification-content-main-list-table-body-img">
                                                    <img src={transformImg(value.al?value.al.picUrl:"https://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg",50)}></img>
                                                </a>:""}
                                                <span className="sprite_table ranking-classification-content-main-list-table-body-playbutton">

                                                </span>
                                                <span className="ranking-classification-content-main-list-table-body-songname">
                                                    <a href="https://music.163.com/#/song?id=1895330088">
                                                        <b title={value.tns}>
                                                            {value.name}
                                                        </b>
                                                    </a>
                                                    <span>{value.tns?"- ("+value.tns+")":null}</span>                           
                                                </span>
                                            </div>
                                        </td>
                                        <td className="ranking-classification-content-main-list-table-body-timeicon">
                                            <span>{formatMinuteSecond(value.dt)}</span>
                                            <div>
                                                <a className="sprite_icon2"></a>
                                                <span className="sprite_table"></span>
                                                <span className="sprite_table"></span>
                                                <span className="sprite_table"></span>
                                            </div>
                                        </td>
                                        {/* value.dt */}
                                        <td style={{padding: "6px 10px"}}>
                                            <div style={{width:"150px",overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",wordWrap:"normal"}}>
                                                <span style={{fontSize:"12px"}}>
                                                    {
                                                        value.ar?value.ar.map((value,key)=>{
                                                            if(key!=0)
                                                                return "/"+value.name
                                                            return value.name;
                                                        }):null
                                                    }
                                                </span>
                                            </div>
                                        </td>
                                    </tr>)

                                }):null}
                                
                            </tbody>
                        </table>
                    </div>
                </div>
                {/* 评论 */}
                <div className="ranking-classification-content-main-cmt">
                    <div className="ranking-classification-content-main-header">
                        <h3>评论</h3>
                        <span style={{color:"#aeaeae"}}>共{topListCMTCounts}条评论</span>
                    </div>
                    <div className="ranking-classification-content-main-cmt-edit">
                        <Row justify="start">
                            <Col flex={1}>
                                <Avatar size={50} col={1} icon={<UserOutlined/>} />
                            </Col>
                            <Col flex={40}>
                                <Form form={form} col={5}>
                                    <Form.Item>
                                        <TextArea rows={2}  onChange={onTextChange} value={textValue} style={{resize:"none"}}/>
                                    </Form.Item>
                                    <Form.Item>
                                        <Button htmlType="submit"  onClick={onCommentSubmit} type="primary">
                                            评论
                                        </Button>
                                    </Form.Item>
                                </Form>
                            </Col>
                        </Row>
                    </div>
                    <div className="ranking-classification-content-main-cmt-cnt">
                        <div className="ranking-classification-content-main-header" style={{border:"none"}}>
                            <h3 style={{fontSize:"12px"}}>精彩评论</h3>
                        </div>
                        {/* comment */}
                        {
                            topListCMTContents.map((value,key)=>{
                                return (
                                    <div className="ranking-classification-content-main-cmt-cnt-wrap" key={value.commentId}>
                                        <div className="ranking-classification-content-main-cmt-cnt-wrap-head">
                                         <a>
                                             <img src={transformImg(value.user?value.user.avatarUrl:currentTopListDetail.coverImgUrl,50)}></img>
                                         </a>
                                        </div>
                            
                                        <div className="ranking-classification-content-main-cmt-cnt-wrap-cntwrap">
                                            <div>
                                                <a href="https://music.163.com/#/user/home?id=371405587" style={{color:"#0c73c2"}}>{value.user?value.user.nickname:""}</a>
                                                ：{value.content}
                                            </div>
                                            <div className="ranking-classification-content-main-cmt-cnt-wrap-cntwrap-2nddiv">
                                                <div>{value.timeStr}</div>
                                                <div>
                                                    <a>
                                                        <i className="sprite_icon3"></i>
                                                        <span>&nbsp;({value.likedCount})</span>
                                                    </a>
                                                    <span style={{verticalAlign:"top",margin:"0 8px"}}>|</span>
                                                    <a style={{verticalAlign:"top"}}>回复</a>
                                                </div>
                                            </div>
                                        </div>
                                </div>
                                )
                            })
                        }
                        <Pagination defaultCurrent={1} total={topListCMTCounts} hideOnSinglePage={false} size="small" pageSize={16} showSizeChanger={false} onChange={(page,pagesize)=>{changeCurrentPage(page,pagesize)}}/>

                    </div>
                </div>
            </div>
        </div>
    )
})
