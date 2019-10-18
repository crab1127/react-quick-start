/** @format */

// 地址管理

import {request} from './request'

/** 获取地址列表 */
export const getAddress = () =>
  request({
    url: `/address`,
  })
/** 获取默认地址 */
export const getDefaultAddress = () =>
  request({
    url: `/address/default`,
  })
/**添加地址 */
export const createAddress = ({data}) =>
  request({
    url: `/address`,
    method: 'POST',
    data,
  })
/** 更新地址 */
export const updateAddress = ({id, data}) =>
  request({
    url: `/address/${id}`,
    method: 'PUT',
    data,
  })
/** 删除地址 */
export const deleteAddress = ({id}) =>
  request({
    url: `/address/${id}`,
    method: 'delete',
  })
