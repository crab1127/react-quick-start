/** @format */

export interface IAddress {
  id: number
  name: string
  mobile: number
  college_id: number
  college_name: string
  address: string
  default?: 0 | 1
}
export interface IAddressSelect {
  address_id?: number
  address_name?: string
  address_mobile?: number
  address_detail?: number
}
