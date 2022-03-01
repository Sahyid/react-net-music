import {lazy} from 'react'

const routes=[
    {
        path:"/",
        exact:true,
        redirect:'/discover/recommend'
    },
    {
        path:'/discover',
        component:lazy(() => import('@/pages/discover')),
        childRoutes:[
            {
                path:'/discover/recommend',
                component:lazy(() => import('@/pages/discover/c-page/recommend')),
            },
            {
                path:'/discover/ranking',
                component:lazy(()=> import('@/pages/discover/c-page/ranking')),
            },
            {
                path:'/discover/songs',
                component:lazy(()=> import('@/pages/discover/c-page/songs')),
            },
        ]
    }
    
]
export default routes;