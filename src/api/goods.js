import request from '../request/request'

export const getCategory = () => {
  return request({
    url: `/v1.0/CommodityCategoryController/list`
  })
}

export const getGoodsList = (query) => {
  return request({
    url: `/v1.0/CommodityController/findPage`,
    params: query
  })
}