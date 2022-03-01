import request from '@/services/newRequest'

export function getTopListInfo(){
    return request({
      url:"/toplist/detail",
    })
}
export function getTopListDetail(id) {
    return request({
      url: '/playlist/detail',
      params: {
        id
      }
    })
}
export function getTopListCMTCounts(id) {
    return request({
      url: '/playlist/detail/dynamic',
      params: {
        id
      }
    })
}
export function getTopListCMTContents(id,limit,offset) {
    return request({
      url: '/comment/playlist',
      params: {
        id,
        limit,
        offset,
      }
    })
}