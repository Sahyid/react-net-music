import {memo} from 'react'

//my components
import TopBanners from './c-cpns/top-banners';
import KyHotRecommend from './c-cpns/hot-recommend';
import KyNewAlbum from './c-cpns/new-album'
import KyRecommendRanking from './c-cpns/recommend-ranking'
import KyUserLogin from './c-cpns/user-login'
import KySettleSinger from './c-cpns/settle-singer'
import KyHotAnchor from './c-cpns/hot-anchor'

import './index.less'
function Recommend(props) {
    return (
        <>
            <TopBanners/>
            <div className="recommend-content">
                <div className="recommend-left-content">
                    <KyHotRecommend/>
                    <KyNewAlbum/>
                    <KyRecommendRanking/>
                </div>
                <div className="recommend-right-content">
                    <KyUserLogin/>
                    <KySettleSinger/>
                    <KyHotAnchor/>
                </div>
            </div>
        
        </>
    )
}

export default memo(Recommend);
