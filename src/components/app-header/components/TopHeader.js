import React, { memo, useState,useCallback } from 'react'
import {NavLink} from 'react-router-dom'

import {headerLinks} from '../../../common/local-data'
import { Input,Modal,Form, Button, Checkbox } from 'antd';

import { SearchOutlined } from '@ant-design/icons'

import '../index.less'
export default memo(function TopHeader() {
    const [isVisible,setIsVisible]=useState(false);
    const [isShowLoginPage,setIsShowLoginPage]=useState(false);
    const showModel=useCallback(
        ()=>{
            setIsVisible(!isVisible);
        },
        [isVisible],
    )
    const showLoginPage=useCallback(
        ()=>{
            console.log(isShowLoginPage)
            setIsShowLoginPage(!isShowLoginPage);
        },
        [isShowLoginPage],
    )
    
    const selectItem = (item,index)=>{
        if(index<3){
            return (
                <NavLink key={index} className="nav-li" to={item.link}>
                    {item.title}
                    <i className="sprite-icon"></i>
                </NavLink>
            )
        }else{
            return <a key={index} className="nav-li" href={item.link}>{item.title}</a>
        }
    }
    /*useEffect(() => {
        console.log("进来Effect")
        getTopBanners().then((data)=>{
            console.log(data)
        })
        return () => {
            console.log("注销组件")
        }
    }, [])*/
    return (
        <>
        <div className="top-header">
            <div className="header-content">
                <div className="left-div">
                    <a hidefocus="true" href="/" className="net-cloud-logo">网易云音乐</a>
                        {/* 只能写表达式，不能写一般的代码 */}  
                    {   

                        headerLinks.map((value,index)=>{ 
                            return (
                                    selectItem(value,index)
                            );                            
                        })  
                    }
                    
                </div>
                
                <div className="right-div">
                    <Input className="search" prefix={<SearchOutlined />}  placeholder="音乐/视频/电台/用户" />
                    <a className="center" href="/#">创作者中心</a>
                    <p className="login-right" onClick={()=>{showModel()}}>登录</p>
                </div>
                {/* <Modal title="Basic Modal" visible={isVisible} onOk={handleOk} onCancel={handleCancel}> */}
                <Modal title="登录" visible={isVisible} onCancel={()=>{setIsVisible(false);setIsShowLoginPage(!isShowLoginPage)}} footer={null} >
                {isShowLoginPage?
                        (
                            <div className='phoneLoginpage'>
                                <Form
                                  name="basic"
                                  labelCol={{ span: 8 }}
                                  wrapperCol={{ span: 12 }}
                                  initialValues={{ remember: true }}
                                  onFinish={()=>{console.log("on finish")}}
                                  onFinishFailed={()=>{console.log("finish failed")}}
                                  autoComplete="off"
                                >
                                  <Form.Item
                                    label="手机号"
                                    name="phoneNumber"
                                    rules={[{ required: true, message: 'Please input your phone number!'},{pattern:/^1\d{10}( 1\d{10})*$/,message:"手机格式不正确"}]}
                                    validateTrigger="onBlur"
                                  >
                                    <Input />
                                  </Form.Item>

                                  <Form.Item
                                    label="密码"
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                  >
                                    <Input.Password />
                                  </Form.Item>

                                  <Form.Item name="remember" valuePropName="checked" style={{display:"inline-block",width:"188px",marginLeft:"146px"}}>
                                    <Checkbox>记住密码</Checkbox>
                                  </Form.Item>
                                  <Button type="primary" htmlType="submit">
                                      登录
                                    </Button>
                                </Form>
                            </div>
                        ):(<div className='model-parent'>
                        <div className='model-left'>
                            <div className="model-img platform"></div>
                            <button className='sprite_button' onClick={()=>{showLoginPage()}}>手机号登录</button>
                            <button className='sprite_button'>注册</button>
                        </div>
                        <div className='model-right'>
                            <ul>
                                <li>
                                    <i className='logo' style={{backgroundPosition: "-150px -670px"}}></i>
                                    <span>微信登录</span>
                                </li>
                                <li>
                                    <i className='logo' style={{backgroundPosition: "-190px -670px"}}></i>
                                    <span>QQ登录</span>
                                </li>
                                <li>
                                    <i className='logo' style={{backgroundPosition: "-231px -670px"}}></i>
                                    <span>微博登录</span>
                                </li>
                                <li>
                                    <i className='logo' style={{backgroundPosition: "-271px -670px"}}></i>
                                    <span>网易邮箱账号登录</span>
                                </li>
                            </ul>
                        </div>
                    </div>)}
                    
                 </Modal>
            </div>
        </div>
        
        </>
    )
})
