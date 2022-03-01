import React, { memo } from 'react'
import {NavLink} from 'react-router-dom'

import './index.less'

import {dicoverMenu} from '@/common/local-data.js'

export default memo(function KyDiscover(props) {
    const {children}=props
    return (
        <div className="discover-content">
            <div className="top-menu">
                <div className="center-box">
                    <ul className="menu-list">
                        {dicoverMenu.map((value,index)=>{
                            return (
                                <li key={value.link}>
                                    <NavLink  to={value.link}>
                                        <em>
                                            {value.title}
                                            {index===2?<span className="f-pa"></span>:null}
                                        </em>
                                    </NavLink>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            </div>
            {children}
        </div>
        
    )
})
