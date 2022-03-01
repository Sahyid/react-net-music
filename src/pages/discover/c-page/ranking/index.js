import React, { memo,useEffect} from 'react'
import { shallowEqual, useDispatch,useSelector } from 'react-redux'
// eslint-disable-next-line
import {getTopListInfoAction,getTopListDetailAction} from './store/actionCreator'
//ky components
import KyRankingClassification from './c-cpns/classification'
import KyRankingClassificationContent from './c-cpns/content'
//less
import './index.less'
export default memo(function KyRanking() {
    const dispatch = useDispatch();
    const {topListInfo} = useSelector((state)=>{
        return {
            "topListInfo":state.getIn(['ranking','topListInfo']),//currentTopListDetail
        }
    },shallowEqual)

    useEffect(() => {
        dispatch(getTopListInfoAction());
    }, [dispatch])
    return (
        <div className="ranking-wrapper">
            <div className="ranking-wrapper-left">
                <h2>云音乐特色榜</h2>
                {
                    topListInfo.map((value,key)=>{
                        if(key<4){
                            return (
                                <KyRankingClassification key={value.id} info={value}/>
                            )
                        }else{  
                            return null;
                        }

                    })
                }
                <h2 style={{marginTop:"20px"}}>全球媒体榜</h2>
                {
                    topListInfo.map((value,key)=>{
                        if(key>3){
                            return (
                                <KyRankingClassification key={value.id} info={value}/>
                            )
                        }else{  
                            return null;
                        }

                    })
                }
            </div>
            <div className="ranking-wrapper-right">
                {<KyRankingClassificationContent/>}
            </div>
        </div>
    )
})
