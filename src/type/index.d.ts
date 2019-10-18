/** @format */

export * from './address'

export type IStatus = 'loading' | 'error' | 'success'

export interface ICategory {
  id: number
  name: string
}
export interface IShop {
  id: number
  name: string
  logo: string
  intro: string
}
export interface IGoods {
  id: number
  shop_id: number
  name: string
  logo: string
  price: number
  /** 数量 */
  count: number
}
