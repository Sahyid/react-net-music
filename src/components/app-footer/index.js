import React, { Fragment } from "react"

import './index.less'

import {footerLinks,footerImages} from '@/common/local-data.js'
export default function KyAppFooter(){
    return (
        <div className="footer">
            <div className="content">
                <div className="left-content">
                    <p className="link-list">
                        {
                            footerLinks.map((value,key)=>{
                                if(key<footerLinks.length-1){
                                    return (
                                        <Fragment key={value.link}>
                                        <a href={value.link} target="_blank" rel="noopener noreferrer">{value.title}</a>
                                        <span>|</span>
                                        </Fragment>
                                    )
                                }
                                else{
                                    return (
                                        <a key={value.link} href={value.link} target="_blank" rel="noopener noreferrer">{value.title}</a>
                                    )
                                }
                            })
                        }
                    </p>
                    <p>
                        <span style={{marginRight:"14px"}}>网易公司版权所有©1997-2021</span>
                        <span>杭州乐读科技有限公司运营：</span>
                        <a rel="noopener noreferrer" href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png" target="_blank" >浙网文[2021] 1186-054号</a>
                    </p>
                    <p>
                        <span style={{marginRight:"14px"}}>违法和不良信息举报电话：0571-89853516</span>
                        <span> 举报邮箱：</span>
                        <a rel="noopener noreferrer" href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png" target="_blank" >ncm5990@163.com</a>
                    </p>
                    <p>
                        <a style={{marginRight:"14px"}} rel="noopener noreferrer" href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png" target="_blank" >粤B2-20090191-18  工业和信息化部备案管理系统网站</a>
                        <a rel="noopener noreferrer" href="https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/8282703158/452a/ca0c/3a10/caad83bc8ffaa850a9dc1613d74824fc.png" target="_blank" >
                            <span className="police-logo"></span>
                            <span>浙公网安备 33010902002564号</span>
                        </a>
                    </p>
                
                </div>
                <div className="right-content">
                    <ul>
                        {
                            footerImages.map((value,index)=>{
                                return (
                                    <li key={value.link}>
                                        <a className="img-list" rel="noopener noreferrer" href={value.link} target="_blank"> </a>
                                        <span className="span-list"></span>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div> 

        </div>
    )
}