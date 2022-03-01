import request from '@/services/newRequest'

export function getTopBanners(){
    return request({
        url:"/banner"
    });
}

export function getHotrmc(limit){
    return request({
        url:"/personalized",
        params:{
            limit
        }
    });
}

export function getNewAlbum(limit){
    //limit=10
    return request({
        url:"/top/album",
        params:{
            limit
        }
    });
}

export function getTopList(id) {
    return request({
      url: "/playlist/detail",
      params: {
        id
      }
    })
}


export function getSettleSingers(type,limit) {
    return request({
      url: "/artist/list",
      params: {
        type,
        limit
      }
    })
}
export function getArtistDetails(id) {
    return request({
      url: "/artist/detail",
      params: {
        id
      }
    })
}

export function getHotAnchor(limit){
  return request({
    url:"/dj/toplist/popular",
    params:{
      limit
    }
  })
}

export function getSongDetail(ids){
  return request({
    url:"/song/detail",
    params:{
      ids
    }
  })
}
export function getSongUrl(id){
  return request({
    url:"/song/url",
    params:{
      id
    }
  })
}
export function getSongLyric(id){
  return request({
    url:"/lyric",
    params:{
      id
    }
  })
}

