import request from '@/services/newRequest'

export function getSongCategoryList(cat="全部", offset=0, limit = 35) {
    return request({
      url: "/top/playlist",
      params: {
        cat,
        limit,
        offset
      }
    })
}
export function getSongCategory() {
  return request({
    url: "/playlist/catlist"
  })
}