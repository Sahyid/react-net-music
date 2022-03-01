import React, { memo } from 'react'

import './index.less'
export default memo(function KyUserLogin() {
    return (
        <div className="userLogin-parent">
            <div className="userLogin-content sprite_02">
                <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
                <a className="sprite_02" href="todo">用户登录</a>
            </div>
        </div>
    )
})
